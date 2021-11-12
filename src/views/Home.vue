<template>
  <div class="home">
    <h3>元素溢出隐藏</h3>
    <div class="">
      <div class="fixed-width">
        <Ellipsis>
          Nest 与数据库无关，允许您轻松地与任何 SQL 或 NoSQL
          数据库集成。根据您的偏好，您有许多可用的选项。一般来说，将 Nest
          连接到数据库只需为数据库加载一个适当的 Node.js 驱动程序，就像使用
          Express 或 Fastify 一样。 您还可以直接使用任何通用的 Node.js
          数据库集成库或 ORM ，例如 Sequelize (recipe)、knexjs (tutorial)`和
          TypeORM ，以在更高的抽象级别上进行操作。 为了方便起见，Nest
          还提供了与现成的 TypeORM 与 @nestjs/typeorm
          的紧密集成，我们将在本章中对此进行介绍，而与 @nestjs/mongoose
          的紧密集成将在这一章中介绍。这些集成提供了附加的特定于 nestjs
          的特性，比如模型/存储库注入、可测试性和异步配置，从而使访问您选择的数据库更加容易。
        </Ellipsis>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Ellipsis from "@/components/Ellipsis/index.vue";

export default defineComponent({
  name: "Home",
  components: {
    Ellipsis,
  },
});
</script>
<style lang="scss" scoped>
.fixed-width {
  width: 400px;
  background-color: rgba(128, 109, 158,0.3);
  font-size:18px;
  line-height: 24px;
  font-weight: bold;
  letter-spacing: 2px;
}
</style>
