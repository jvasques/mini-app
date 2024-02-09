<template>
  <div class="form-container">
    <h2>{{ editando ? "Editar Usuário" : "Cadastrar Usuário" }}</h2>
    <b-form @submit.prevent="handleSubmit">
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group
            label="Nome Completo:"
            label-for="nomeCompleto"
            class="mb-0"
          >
            <b-form-input
              id="nomeCompleto"
              v-model="form.nome"
              @input="handleNameInput"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="Email:" label-for="email" class="mb-0">
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="Gênero:" label-for="genero" class="mb-0">
            <b-form-select
              id="genero"
              v-model="form.genero"
              :options="generoOptions"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group
            label="Data de Nascimento:"
            label-for="dataNascimento"
            class="mb-0"
          >
            <b-form-input
              id="dataNascimento"
              v-model="form.dataNascimento"
              type="date"
              required
              style="width: auto; max-width: 100%"
              :max="getCurrentDate()"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="CPF:" label-for="cpf" class="mb-0">
            <b-input-group>
              <b-form-input
                id="cpf"
                v-model="form.cpf"
                @input="authenticateCPF"
                @keydown="preventExcessCpfInput"
                required
              ></b-form-input>
            </b-input-group>
            <div class="cpf-validation" :class="{ 'is-invalid': !validCPF }">
              {{ !validCPF ? "CPF inválido" : "" }}
            </div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-button type="submit" variant="primary" style="margin-top: 30px">
        {{ editando ? "Atualizar" : "Cadastrar" }}
      </b-button>
    </b-form>

    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],

  data() {
    return {
      form: {
        nome: "",
        email: "",
        dataNascimento: "",
        genero: "",
        cpf: "",
      },
      generoOptions: [
        { text: "Masculino", value: "Masculino" },
        { text: "Feminino", value: "Feminino" },
        { text: "Prefiro não informar", value: "Não Informado" },
      ],
      editando: false,
      userId: null,
      validCPF: true,
    };
  },

  mounted() {
    this.userId = this.$route.params.id;
    if (this.userId) {
      this.getUserDetails(this.userId);
      this.editando = true;
    }
  },

  methods: {
    async handleSubmit() {
      try {
        this.authenticateCPF();

        if (!this.validCPF) {
          window.alert("CPF inválido. Por favor, corrija antes de enviar.");
          return;
        }

        if (this.form.cpf.trim().length !== 11) {
          window.alert("O CPF deve ter exatamente 11 caracteres.");
          return;
        }

        if (this.editando && this.userId) {
          const url = `http://localhost:3000/usuarios/atualizar/${this.userId}`;
          await axios.put(url, this.form);
          window.alert("Dados atualizados com sucesso!", {
            title: "Sucesso",
            variant: "success",
          });
          this.$router.push("/");
        } else {
          await axios.post(
            "http://localhost:3000/usuarios/cadastrar",
            this.form
          );
          window.alert("Dados cadastrados com sucesso!", {
            title: "Sucesso",
            variant: "success",
          });
          this.$router.push("/");
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          window.alert(error.response.data.message, {
            title: "Erro",
            variant: "danger",
          });
        } else {
          console.error("Erro ao enviar dados:", error);

          window.alert("Erro ao enviar dados. Por favor, tente novamente.", {
            title: "Erro",
            variant: "danger",
          });
        }
      }
    },

    async getUserDetails(id) {
      try {
        const response = await axios.get(
          `http://localhost:3000/usuarios/detalhes/${id}`
        );
        this.form = response.data;
      } catch (error) {
        console.error("Erro ao carregar detalhes do usuário:", error);
      }
    },

    handleNameInput() {
      this.form.nome = this.form.nome.replace(/[^a-zA-ZÀ-ú\s]/g, "");
      this.form.nome = this.capitalizeFirstLetter(this.form.nome);
    },

    capitalizeFirstLetter(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },

    getCurrentDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    preventExcessCpfInput(event) {
      this.form.cpf = this.form.cpf.replace(/\D/g, "");
      if (!/^\d$/.test(event.key) && event.key !== "Backspace") {
        event.preventDefault();
      }

      let cpf = this.form.cpf || "";
      if (cpf.length >= 11) {
        const cursorPosition = event.target.selectionStart;
        cpf = cpf.slice(0, cursorPosition - 1) + cpf.slice(cursorPosition);
        this.form.cpf = cpf;
      }
    },

    authenticateCPF() {
      let calc = 0;
      for (let i = 0; i < 9; i++) {
        calc += parseInt(this.form.cpf.charAt(i)) * (10 - i);
      }
      let remainder = calc % 11;
      let verifDigit1 = remainder < 2 ? 0 : 11 - remainder;

      calc = 0;
      for (let i = 0; i < 10; i++) {
        calc += parseInt(this.form.cpf.charAt(i)) * (11 - i);
      }
      remainder = calc % 11;

      let verifDigit2 = remainder < 2 ? 0 : 11 - remainder;
      this.validCPF =
        verifDigit1 === parseInt(this.form.cpf.charAt(9)) &&
        verifDigit2 === parseInt(this.form.cpf.charAt(10));
    },

    clearForm() {
      this.form = {
        nome: "",
        email: "",
        dataNascimento: "",
        genero: "",
        cpf: "",
      };
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 40px;
}

.form-container {  
  margin: 40px auto;
  width: 80%;
}
.cpf-validation {
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}

.is-invalid {
  border-color: #dc3545;
}
</style>