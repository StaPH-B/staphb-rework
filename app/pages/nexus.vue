<template>
  <div>
    <NavBar/>
  </div>
  <div>
    <Search 
      :items="searchCategories"
      placeholder="Search StaPH-B Nexus"
    />
  </div>
  <div>
    <Footer/>
  </div>
</template>

<script lang="ts" setup>
const searchCategories = [
  { label: 'Pipelines', value: 'pipelines' },
  { label: 'Trainings', value: 'trainings' },
  { label: 'Resources', value: 'resources' }
]


const { data: rawPipelines } = await useAsyncData('pipelines', () => 
  queryCollection('pipelines').all()
);
const searchTerm = ref('');
</script>

<style>
</style>