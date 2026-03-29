<template>
  <main>
    <HeroSection />
    <AboutSection />
    <ProductGrid />
    <!-- <StateSection /> -->
    <CtaSection />
  </main>
</template>

<script setup>
// 이미 만들어둔 컴포넌트 불러오기
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ProductGrid from '@/components/ProductGrid.vue'
// import StateSection from '@/components/StateSection.vue'
import CtaSection from '@/components/CtaSection.vue'
</script>
