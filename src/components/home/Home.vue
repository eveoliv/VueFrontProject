<template>

<div>
  <h1 class="centralizado">{{ titulo }}</h1>
  
  <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre por parte do titulo">
  
  <ul class="lista-fotos">
    
    <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto">       
      <!-- erro de chave duplicada :key="foto"-->
      <meu-painel :titulo="foto.titulo">       
          <imagem-responsiva v-meu-transform:scale.animacao="2" :url="foto.url" :titulo="foto.titulo"/>
          <meu-botao tipo="button" 
                     rotulo="REMOVER" 
                     @botaoAtivado="remove(foto)" 
                     :confirmacao="true"
                     estilo="perigo"  />
      </meu-painel>

    </li>    
  </ul>

</div>
</template>

<script>
import Botao from '../shared/botao/Botao.vue';
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';

export default {

  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },

  data() {

    return {
      titulo: 'Vue Fotos Single Page',
      fotos: [],
      filtro: ''
    }
  },

  computed: {

    fotosComFiltro() {

      if(this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i')
        return this.fotos.filter(foto => exp.test(foto.titulo));
      }else{
        return this.fotos;
      }
    }
  },
  
  methods: {

    remove(foto) {
      
      alert('Remover a foto! ' + foto.titulo);        
      
    }
  },

  created() {
    
    let promisse = this.$http.get('http://localhost:3000/v1/fotos')    
      .then(res => res.json())
      .then(fotosApi => this.fotos = fotosApi, err => console.log(err));
  }
}

</script>

<style>

  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: nome;
  }

  .lista-fotos .lista-fotos-item {
    
    display: inline-block;
  }

  .painel {
    padding: 0 auto;
    border: solid 2px grey;
    display: inline-block;
    margin: 5px;
    box-shadow: 5px 5px 10px grey;
    width: 200px;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }

  .painel .painel-titulo {
    text-align: center;
    border: solid 2px;
    background: lightblue;
    margin: 0 0 15px 0;
    padding: 10px;
    text-transform: uppercase;
  }

  .filtro {
    
    display: block;
    width: 100%;
  }

</style>