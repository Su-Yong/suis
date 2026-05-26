<script setup>
import SolidKitLiveDemo from './components/SolidKitLiveDemo.vue'
</script>

# SolidJS in VitePress

아래 컴포넌트는 VitePress Markdown 페이지 안에서 Vue wrapper를 통해 마운트되는 SolidJS kit live demo입니다.

<ClientOnly>
  <SolidKitLiveDemo title="SUIS Kit Live Demo" :initial-count="3" />
</ClientOnly>
