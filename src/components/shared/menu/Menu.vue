<template>
    
     <nav>
      <ul>
        <li v-for="rota in rotas" :key="rota">
          <!-- erro de chave duplicada :key="rota"-->
          <router-link :to="rota.path ? rota.path : '/'">{{ rota.titulo }}</router-link>
        </li>        
      </ul>
    </nav>

</template>

<script>

export default {

    props: ['rotas']
}

</script>

<style>

</style>