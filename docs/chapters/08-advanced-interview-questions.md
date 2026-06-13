# 第八章：进阶面试题（21-40）

## 设计模式题

### Q21：如何设计一个可复用的 Skill 框架？

**答：**

**框架要素：**
1. **标准化接口** — 统一的输入输出格式
2. **模块化设计** — 可组合的组件
3. **配置驱动** — 通过参数定制行为
4. **插件机制** — 支持扩展

**示例框架：**
```yaml
---
name: generic-deploy-framework
description: "Use when deploying any application. Generic framework that can be customized via parameters."
---

# 通用部署框架

## Steps

### 1. 读取配置
```bash
# 从配置文件读取部署参数
CONFIG_FILE="deploy-config.yaml"
```

### 2. 根据配置执行
- 读取 `deploy_type` 字段
- 调用对应的部署脚本
- 传递参数

### 3. 验证部署
- 健康检查
- 功能测试
- 性能测试
```

### Q22：如何处理 Skill 的版本兼容性？

**答：**

**版本策略：**
1. **语义化版本** — `MAJOR.MINOR.PATCH`
2. **向后兼容** — 新版本兼容旧版本
3. **废弃警告** — 提前通知废弃功能
4. **迁移指南** — 提供升级步骤

**示例：**
```yaml
---
name: my-skill
version: 2.0.0
metadata:
  hermes:
    deprecated_versions: ["1.x"]
    migration_guide: "references/migration-v1-to-v2.md"
---

## Migration Notes

### 从 v1.x 升级到 v2.0

**破坏性变更：**
1. 配置文件格式变更
2. 命令行参数变更

**迁移步骤：**
1. 备份旧配置
2. 运行迁移脚本
3. 验证新配置
```

### Q23：如何实现 Skill 的条件分支？

**答：**

**方式 1：在 Steps 中使用条件判断**
```markdown
## Steps

### 1. 检查环境
```bash
# 检测操作系统
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
fi
```

### 2. 根据环境执行
```bash
if [ "$OS" == "macos" ]; then
    # macOS 特定命令
    brew install package
elif [ "$OS" == "linux" ]; then
    # Linux 特定命令
    apt install package
fi
```
```

**方式 2：使用多个 Skill**
```yaml
# skill 1: deploy-macos
description: "Use when deploying on macOS."

# skill 2: deploy-linux
description: "Use when deploying on Linux."
```

### Q24：如何处理 Skill 的错误恢复？

**答：**

**错误恢复策略：**
1. **检查点机制** — 记录执行进度
2. **回滚操作** — 失败时撤销操作
3. **重试机制** — 自动重试失败步骤
4. **人工干预** — 询问用户如何处理

**示例：**
```markdown
## Steps

### 1. 创建备份
```bash
# 记录当前状态
BACKUP_DIR="/tmp/backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p $BACKUP_DIR
cp -r important-data $BACKUP_DIR/
```

### 2. 执行操作
```bash
# 可能失败的操作
if ! risky-operation; then
    echo "操作失败，正在回滚..."
    cp -r $BACKUP_DIR/important-data .
    exit 1
fi
```

### 3. 验证结果
```bash
if ! verify-operation; then
    echo "验证失败，正在回滚..."
    cp -r $BACKUP_DIR/important-data .
    exit 1
fi
```
```

### Q25：如何设计 Skill 的测试策略？

**答：**

**测试层次：**
1. **单元测试** — 测试单个步骤
2. **集成测试** — 测试完整流程
3. **验收测试** — 验证用户场景
4. **回归测试** — 确保修改不引入新问题

**测试方法：**
```bash
# 1. 匹配测试
hermes chat -q "创建一个 Python 项目" 2>&1 | grep "python-project-scaffold"

# 2. 执行测试
hermes --skills python-project-scaffold chat -q "创建项目 test-project"

# 3. 验证测试
ls -la ~/myprojects/test-project
conda env list | grep test-project

# 4. 边界测试
hermes chat -q "创建一个不存在的项目类型"
```

## 实现细节题

### Q26：如何优化 Skill 的加载性能？

**答：**

**优化策略：**
1. **索引机制** — 预构建 skill 索引
2. **缓存机制** — 缓存已加载的 skill
3. **懒加载** — 按需加载，不预加载全部
4. **压缩机制** — 压缩 skill 内容

**实现方式：**
```python
# 伪代码
class SkillLoader:
    def __init__(self):
        self.index = {}  # name -> file_path
        self.cache = {}  # name -> parsed_skill
    
    def build_index(self):
        """预构建索引"""
        for skill_dir in glob("~/.hermes/skills/*/"):
            skill_file = f"{skill_dir}/SKILL.md"
            metadata = parse_metadata(skill_file)
            self.index[metadata["name"]] = skill_file
    
    def load_skill(self, name):
        """按需加载"""
        if name in self.cache:
            return self.cache[name]
        
        if name not in self.index:
            return None
        
        skill = parse_skill(self.index[name])
        self.cache[name] = skill
        return skill
```

### Q27：如何处理 Skill 的并发访问？

**答：**

**场景：**
- 多个会话同时使用同一个 skill
- 一个会话修改 skill，另一个会话正在使用

**解决方案：**
1. **只读加载** — 加载后不可修改
2. **版本快照** — 使用修改前的版本
3. **锁机制** — 修改时锁定
4. **乐观锁** — 检测冲突后重试

**示例：**
```python
# 只读加载
def load_skill_readonly(name):
    content = read_file(f"~/.hermes/skills/{name}/SKILL.md")
    return parse_skill(content)  # 返回解析后的副本

# 修改时使用锁
def update_skill(name, content):
    lock_file = f"~/.hermes/skills/{name}/.lock"
    
    # 获取锁
    acquire_lock(lock_file)
    try:
        write_file(f"~/.hermes/skills/{name}/SKILL.md", content)
    finally:
        release_lock(lock_file)
```

### Q28：如何实现 Skill 的依赖注入？

**答：**

**依赖注入的好处：**
1. **解耦** — Skill 不直接依赖具体实现
2. **可测试** — 可以注入 mock 实现
3. **灵活** — 运行时切换实现

**示例：**
```yaml
---
name: deploy-skill
description: "Use when deploying applications."
metadata:
  hermes:
    inject:
      logger: "default-logger"
      notifier: "default-notifier"
---

# 部署 Skill

## Steps

### 1. 开始部署
```bash
# 使用注入的 logger
logger.info("开始部署...")

# 使用注入的 notifier
notifier.send("部署开始")
```

### 2. 部署完成
```bash
logger.info("部署完成")
notifier.send("部署成功")
```
```

### Q29：如何处理 Skill 的国际化？

**答：**

**国际化策略：**
1. **多语言支持** — 同一个 skill 支持多种语言
2. **语言检测** — 自动检测用户语言
3. **翻译机制** — 动态翻译内容

**示例：**
```yaml
---
name: create-project
description:
  en: "Use when creating a new project."
  zh: "使用时创建新项目。"
---

# Create Project / 创建项目

## Steps / 步骤

### 1. Confirm project info / 确认项目信息

**English:**
Ask user for project name and type.

**中文：**
向用户确认项目名称和类型。
```

### Q30：如何实现 Skill 的缓存策略？

**答：**

**缓存层次：**
1. **内存缓存** — 已解析的 skill
2. **文件缓存** — 索引文件
3. **分布式缓存** — 多实例共享

**缓存策略：**
```python
class SkillCache:
    def __init__(self, ttl=3600):
        self.cache = {}
        self.ttl = ttl  # 缓存过期时间
    
    def get(self, name):
        if name in self.cache:
            entry = self.cache[name]
            if time.time() - entry["timestamp"] < self.ttl:
                return entry["skill"]
            else:
                del self.cache[name]
        return None
    
    def set(self, name, skill):
        self.cache[name] = {
            "skill": skill,
            "timestamp": time.time()
        }
```

## 场景应用题

### Q31：如何设计微服务架构下的 Skill？

**答：**

**设计要点：**
1. **服务边界** — 每个微服务对应一组 skill
2. **接口标准化** — 统一的调用接口
3. **服务发现** — 自动发现可用的 skill
4. **负载均衡** — 分散 skill 调用压力

**示例：**
```yaml
---
name: user-service-create
description: "Use when creating users in user-service."
metadata:
  hermes:
    service: user-service
    endpoint: /api/v1/users
    method: POST
---

# User Service - Create User

## Steps

### 1. 调用用户服务
```bash
curl -X POST http://user-service:8001/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name": "test", "email": "test@example.com"}'
```
```

### Q32：如何处理 Skill 的 A/B 测试？

**答：**

**A/B 测试场景：**
- 测试不同的部署策略
- 测试不同的配置方案
- 测试不同的工作流程

**实现方式：**
```yaml
---
name: deploy-strategy
description: "Use when deploying with A/B testing."
metadata:
  hermes:
    ab_test:
      enabled: true
      variants:
        - name: strategy-a
          weight: 50
          description: "Blue-green deployment"
        - name: strategy-b
          weight: 50
          description: "Rolling update"
---

# 部署策略 A/B 测试

## Steps

### 1. 选择策略
```bash
# 根据权重随机选择
if (( RANDOM % 100 < 50 )); then
    STRATEGY="strategy-a"
else
    STRATEGY="strategy-b"
fi

echo "使用策略: $STRATEGY"
```

### 2. 执行部署
```bash
if [ "$STRATEGY" == "strategy-a" ]; then
    # Blue-green 部署
    deploy-blue-green
elif [ "$STRATEGY" == "strategy-b" ]; then
    # Rolling update
    deploy-rolling-update
fi
```
```

### Q33：如何实现 Skill 的监控和告警？

**答：**

**监控指标：**
1. **执行次数** — skill 被调用的次数
2. **成功率** — 执行成功的比例
3. **执行时间** — 平均执行时间
4. **错误率** — 执行失败的比例

**实现方式：**
```yaml
---
name: monitored-skill
description: "Use when executing monitored operations."
metadata:
  hermes:
    monitoring:
      enabled: true
      metrics:
        - execution_count
        - success_rate
        - execution_time
      alerts:
        - condition: "success_rate < 90%"
          action: "notify"
---

# 被监控的 Skill

## Steps

### 1. 开始执行
```bash
# 记录开始时间
START_TIME=$(date +%s)
METRIC_EXECUTION_COUNT=$((METRIC_EXECUTION_COUNT + 1))
```

### 2. 执行操作
```bash
# 执行操作
if operation; then
    METRIC_SUCCESS_COUNT=$((METRIC_SUCCESS_COUNT + 1))
else
    METRIC_FAILURE_COUNT=$((METRIC_FAILURE_COUNT + 1))
fi
```

### 3. 记录指标
```bash
END_TIME=$(date +%s)
EXECUTION_TIME=$((END_TIME - START_TIME))
METRIC_EXECUTION_TIME=$((METRIC_EXECUTION_TIME + EXECUTION_TIME))

# 检查告警条件
SUCCESS_RATE=$((METRIC_SUCCESS_COUNT * 100 / METRIC_EXECUTION_COUNT))
if [ $SUCCESS_RATE -lt 90 ]; then
    notify-alert "成功率低于 90%: $SUCCESS_RATE%"
fi
```
```

### Q34：如何设计多租户的 Skill 系统？

**答：**

**多租户需求：**
- 不同团队使用不同的 skill
- 租户之间隔离
- 共享公共 skill

**设计方式：**
```
~/.hermes/skills/
├── public/                    # 公共 skill
│   ├── git-commit-guide/
│   └── python-project-scaffold/
├── team-a/                    # 团队 A 私有
│   ├── internal-api/
│   └── deploy-staging/
└── team-b/                    # 团队 B 私有
    ├── ml-pipeline/
    └── data-pipeline/
```

**配置方式：**
```yaml
# config.yaml
skills:
  paths:
    - ~/.hermes/skills/public/
    - ~/.hermes/skills/team-a/
  exclude:
    - team-b/*
```

### Q35：如何实现 Skill 的权限控制？

**答：**

**权限模型：**
1. **读权限** — 可以查看和使用 skill
2. **写权限** — 可以创建和修改 skill
3. **执行权限** — 可以执行 skill
4. **管理权限** — 可以管理其他用户的 skill

**实现方式：**
```yaml
---
name: restricted-skill
description: "Use when executing restricted operations."
metadata:
  hermes:
    permissions:
      read: ["user", "admin"]
      write: ["admin"]
      execute: ["user", "admin"]
      admin: ["admin"]
---

# 受限的 Skill

## Steps

### 1. 检查权限
```bash
# 检查当前用户是否有执行权限
if ! check-permission "execute"; then
    echo "错误：没有执行权限"
    exit 1
fi
```

### 2. 执行操作
```bash
# 只有有权限的用户才能执行
restricted-operation
```
```

### Q36：如何处理 Skill 的版本回滚？

**答：**

**回滚场景：**
- 新版本有 bug
- 用户不适应新版本
- 配置不兼容

**实现方式：**
```bash
# 1. 查看版本历史
git log --oneline skills/my-skill/SKILL.md

# 2. 回滚到指定版本
git checkout <commit-hash> -- skills/my-skill/SKILL.md

# 3. 验证回滚
hermes skills inspect my-skill

# 4. 提交回滚
git commit -m "revert: rollback my-skill to v1.0.0"
```

### Q37：如何实现 Skill 的热更新？

**答：**

**热更新需求：**
- 不重启 Hermes 更新 skill
- 立即生效
- 不影响正在执行的任务

**实现方式：**
```python
# 伪代码
class SkillManager:
    def watch_skills(self):
        """监控 skill 文件变化"""
        watcher = FileSystemWatcher("~/.hermes/skills/")
        watcher.on_change(self.on_skill_changed)
    
    def on_skill_changed(self, event):
        """skill 变化时的回调"""
        if event.type == "modified":
            skill_name = extract_skill_name(event.path)
            
            # 更新索引
            self.update_index(skill_name)
            
            # 清除缓存
            self.clear_cache(skill_name)
            
            # 通知正在使用的会话
            self.notify_sessions(skill_name)
```

### Q38：如何设计 Skill 的审计日志？

**答：**

**审计需求：**
- 记录谁在什么时候执行了什么
- 记录执行结果
- 便于问题追溯

**实现方式：**
```yaml
---
name: audited-skill
description: "Use when executing audited operations."
metadata:
  hermes:
    audit:
      enabled: true
      log_file: "~/.hermes/audit.log"
      fields:
        - user
        - timestamp
        - action
        - result
---

# 被审计的 Skill

## Steps

### 1. 记录开始
```bash
AUDIT_ID=$(uuidgen)
echo "$AUDIT_ID|$(date)|$(whoami)|START|my-operation" >> ~/.hermes/audit.log
```

### 2. 执行操作
```bash
if operation; then
    RESULT="SUCCESS"
else
    RESULT="FAILURE"
fi
```

### 3. 记录结束
```bash
echo "$AUDIT_ID|$(date)|$(whoami)|END|$RESULT" >> ~/.hermes/audit.log
```
```

### Q39：如何实现 Skill 的性能分析？

**答：**

**性能指标：**
1. **执行时间** — 每个步骤的执行时间
2. **资源使用** — CPU、内存、磁盘
3. **瓶颈分析** — 找出最慢的步骤

**实现方式：**
```yaml
---
name: profiled-skill
description: "Use when profiling skill execution."
metadata:
  hermes:
    profiling:
      enabled: true
      output: "profile.json"
---

# 被性能分析的 Skill

## Steps

### 1. 开始性能分析
```bash
# 记录开始时间
START=$(date +%s%N)

# 记录资源使用
CPU_START=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}')
MEM_START=$(free -m | awk '/Mem:/{print $3}')
```

### 2. 执行操作
```bash
# 执行被分析的操作
operation
```

### 3. 结束性能分析
```bash
END=$(date +%s%N)
DURATION=$(( (END - START) / 1000000 ))

CPU_END=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}')
MEM_END=$(free -m | awk '/Mem:/{print $3}')

# 输出性能报告
cat > profile.json << EOF
{
  "duration_ms": $DURATION,
  "cpu_usage": "$((CPU_END - CPU_START))%",
  "memory_usage": "$((MEM_END - MEM_START))MB"
}
EOF
```
```

### Q40：如何设计 Skill 的插件系统？

**答：**

**插件系统设计：**
1. **插件接口** — 标准化的插件 API
2. **插件加载** — 动态加载插件
3. **插件管理** — 安装、卸载、启用、禁用
4. **插件通信** — 插件之间可以通信

**示例：**
```yaml
---
name: plugin-based-skill
description: "Use when using plugin-based operations."
metadata:
  hermes:
    plugins:
      - name: logger-plugin
        version: "1.0.0"
        config:
          level: "info"
      - name: notifier-plugin
        version: "1.0.0"
        config:
          channel: "slack"
---

# 基于插件的 Skill

## Steps

### 1. 加载插件
```bash
# 加载 logger 插件
load-plugin logger-plugin

# 加载 notifier 插件
load-plugin notifier-plugin
```

### 2. 使用插件
```bash
# 使用 logger 插件
logger.info("开始执行")

# 使用 notifier 插件
notifier.send("执行开始")

# 执行操作
operation
```

### 3. 卸载插件
```bash
unload-plugin logger-plugin
unload-plugin notifier-plugin
```
```

---

**下一章：** [更多示例](../examples/)
