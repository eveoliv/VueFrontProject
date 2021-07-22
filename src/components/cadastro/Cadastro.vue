<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <h2 v-if="foto._id" class="centralizado">Alterando</h2>
    <h2 v-else class="centralizado">Incluindo</h2>

    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input
          id="titulo"
          autocomplete="off"
          v-model.lazy="foto.titulo"
        />
        <!--binding bilateral <input id="titulo" autocomplete="off" @input="foto.titulo = $event.target.value" :value="foto.titulo"> -->
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input
          id="url"
          autocomplete="off"
          v-model.lazy="foto.url"
        />
        <imagem-responsiva
          v-show="foto.url"
          :url="foto.url"
          :titulo="foto.titulo"
        />
        <!-- <input id="url" autocomplete="off" @input="foto.url = $event.target.value" :value="foto.url"> -->
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea
          id="descricao"
          autocomplete="off"
          v-model="foto.descricao"
        ></textarea>
          <!-- <textarea id="descricao" autocomplete="off" @input="foto.descricao = $event.target.value" :value="foto.descricao"></textarea> -->
      </div>

      <div class="centralizado">
        <meu-botao
          rotulo="GRAVAR"
          tipo="submit"
        />
        <router-link :to="{ name: 'home' }">
          <meu-botao
            rotulo="VOLTAR"
            tipo="button"
          />
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import Foto from "../../domain/foto/Foto";
import Botao from "../shared/botao/Botao.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import FotoService from "../../domain/foto/FotoService";

export default {
  components: {
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },

  data() {
    return {
      foto: new Foto(),
      id: this.$route.params.id
    };
  },

  methods: {
    grava() {
      //exemplo3
      this.service
        .cadastra(this.foto)
        .then(() => {
          if (this.id) this.$router.push({ name: 'home' });                      
          this.foto = new Foto();
        }, err => alert("deu erro"));

      //exemplo2
      // this.resource
      //   .save(this.foto)
      //   .then(() => this.foto = new Foto(), err => alert('deu erro'));;

      //exemplo1
      // this.$http
      //   .post('v1/fotos', this.foto)
      //   .then(() => this.foto = new Foto(), err => alert('deu erro'));
      // this.foto = new Foto();
    }
  },

  created() {
    this.service = new FotoService(this.$resource);
    //this.resource = this.$resource('v1/fotos');

    if (this.id) {
      this.service.busca(this.id).then(foto => (this.foto = foto));
    }
  }
};
</script>

<style scoped>
.centralizado {
  text-align: center;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.controle label {
  display: block;
  font-weight: bold;
}

.controle label + input,
.controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.centralizado {
  text-align: center;
}
</style>