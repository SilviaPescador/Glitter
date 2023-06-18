<!-- <template>
      <form 
        class="input-group w-auto my-auto d-none d-sm-flex" 
        @submit.prevent="search">	

          <div class="form-outline">	

            <input 
            type="text" 
            class="form-control" 
            placeholder="Search glits..." 
            v-model="searchTerm"
            @keyup="$emit('updateSearch',searchTerm)" />

          </div>	

          <button 
          type="submit" 
          class="btn btn-primary btn-form" 
          @click="$emit('updateSearch',searchTerm)">
          <i class="fas fa-search"></i></button>	

      </form>

</template>

<script>
import {ref} from 'vue'

export default {
      name: 'SearchBar',
      setup(props, {emit }) {
            const searchTerm = ref('')

            const search = async () => {
                  const results = await glitterApi.get(`/glits/search?q=${searchTerm.value}`)
                  emit('uptateResults', results.data.docs)
            }
            return { 
                  searchTerm, 
                  search
            }
      }
}

</script>

<style scoped>
.material-icons {
  color: white;
  font-size: 1.4em;
  background-color: #A0C3D2;
  padding: 0.3em;
  border-radius: 50%;
  margin: 0.1em;
}

.input-group {
  max-width: 20em;
}

.container {
  max-width: 855px;
}

.btn-form {
  line-height: 5pt;
  padding: 0 20px;
  background: #95a4ff;
  letter-spacing: 2px;
  transition: .2s all ease-in-out;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 1px 1px #ffa580, 3px 3px 1px 2px rgba(0, 0, 0, 1);
}

input.form-control {
  border: 1px solid rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 1px 1px #ffa580, 3px 3px 1px 2px rgba(0, 0, 0, 1);
  background: #f8f4e5;
}

</style> -->