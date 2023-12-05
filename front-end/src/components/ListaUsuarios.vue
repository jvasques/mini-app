<template>
  <div class="user-list-container">
    <h2>Lista de Usuários</h2>
    <table class="user-table">
      <thead>
        <tr>
          <th style="text-align: center">#</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Data de Nascimento</th>
          <th>Gênero</th>
          <th>CPF</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.id }}</td>
          <td>{{ usuario.nome }}</td>
          <td>{{ usuario.email }}</td>
          <td>{{ dateToDDMMYYYY(usuario.dataNascimento) }}</td>
          <td>{{ usuario.genero }}</td>
          <td>{{ usuario.cpf }}</td>
          <td>
            <button title="Editar" @click="userUpdate(usuario.id)">
              <i class="fas fa-edit"></i>
            </button>
            <button title="Excluir" @click="userDelete(usuario.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <router-link to="/usuarios/cadastrar">
      <button title="Novo Cadastro">
        <i class="fas fa-plus-circle"></i> Cadastrar
      </button>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuarios: [],
    };
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    async getUsers() {
      try {
        const response = await axios.get(
          "http://localhost:3000/usuarios/listar"
        );
        this.usuarios = response.data;
      } catch (error) {
        console.error("Erro ao obter a lista de usuários:", error);
      }
    },

    dateToDDMMYYYY(data) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(data).toLocaleDateString("pt-BR", options);
    },

    userUpdate(id) {
      this.$router.push("/usuarios/editar/" + id);
    },

    async userDelete(id) {
      const confirmDelete = window.confirm(
        "Tem certeza que deseja excluir este usuário?"
      );
      if (confirmDelete) {
        try {
          await axios.delete(`http://localhost:3000/usuarios/excluir/${id}`);
          this.getUsers();
        } catch (error) {
          console.error("Erro ao excluir o usuário:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.user-list-container {
  margin: 20px auto;
  width: 80%;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.user-table th {
  background-color: #f2f2f2;
}

.user-table button {
  margin-right: 5px;
}

@import "~@fortawesome/fontawesome-free/css/all.css";
</style>
