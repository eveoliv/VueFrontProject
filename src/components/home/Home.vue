<template>

  <div>
    <h1 class="centralizado">{{ titulo }}</h1>

    <p
      v-show="mensagem"
      class="centralizado"
    >{{ mensagem }}</p>

      <input
        type="search"
        class="filtro"
        @input="filtro = $event.target.value"
        placeholder="filtre por parte do titulo"
      >

        <ul class="lista-fotos">

          <li
            class="lista-fotos-item"
            v-for="foto of fotosComFiltro"
            :key="foto"
          >
            <!-- erro de chave duplicada :key="foto"-->
            <meu-painel :titulo="foto.titulo">
              <imagem-responsiva
                v-meu-transform:scale.animacao="2"
                :url="foto.url"
                :titulo="foto.titulo"
              />
              <meu-botao
                tipo="button"
                rotulo="REMOVER"
                @botaoAtivado="remove(foto)"
                :confirmacao="true"
                estilo="perigo"
              />
            </meu-painel>

            </li>
        </ul>

  </div>
</template>

<script>
import Botao from "../shared/botao/Botao.vue";
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import FotoService from "../../domain/foto/FotoService";

export default {
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },

  data() {
    return {
      titulo: "Vue Fotos Single Page",
      fotos: [],
      filtro: "",
      mensagem: ""
    };
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },

  methods: {
    remove(foto) {
      
      //exemplo3
      this.service.apaga(foto._id)
        .then(() => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensagem = "Foto removida com sucesso!";
        },
        err => {
          console.log(err);
          this.mensagem = "Não foi possivel remover a foto.";
        }
      );

      //exemplo2
      // this.resource.delete({ id: foto._id })
      //   .then(() => {
      //     let indice = this.fotos.indexOf(foto);
      //     this.fotos.splice(indice, 1);
      //     this.mensagem = "Foto removida com sucesso!";
      //   }, err => {
      //     console.log(err);
      //     this.mensagem = "Não foi possivel remover a foto.";
      //   }
      // );

      //exemplo1
      // this.$http
      //   .delete(`v1/fotos/${foto._id}`)
      //   .then(() => {
      //     let indice = this.fotos.indexOf(foto);
      //     this.fotos.splice(indice, 1);
      //     this.mensagem = "Foto removida com sucesso!";
      //   }, err => {
      //     console.log(err);
      //     this.mensagem = "Não foi possivel remover a foto.";
      //   }
      // );
    }
  },

  created() {
    //exemplo3
    this.service = new FotoService(this.$resource);
    this.service
      .lista()
      .then(fotosApi => (this.fotos = fotosApi), err => console.log(err));

    //exemplo2
    // this.resource = this.$resource('v1/fotos{/id}');
    // this.resource
    //   .query()
    //   .then(res => res.json())
    //   .then(fotosApi => (this.fotos = fotosApi), err => console.log(err));

    //exemplo1
    // let promisse = this.$http
    //  .get('v1/fotos')
    //  .then(res => res.json())
    //  .then(fotosApi => (this.fotos = fotosApi), err => console.log(err));
  }
};
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