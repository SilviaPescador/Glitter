<template>
  <div class="card">
    <h3>Share something with our community 🐥</h3>
    <form @submit.prevent="createGlit">
      <textarea v-model="text" id="textarea" placeholder="Remember we hate KFC and messages that exceed 256 characters"
        maxlength="256"></textarea> <span class="counter">{{ text.length }} / 256</span>
      <div class="mb-3">
        <input class="form-control" id="formFile" type="file" @change="onFileChange" />
      </div>
      <img v-if="imageUrl" :src="imageUrl" />
      <div class="button">
        <button type="button" class="card postBtn text-white" @click="createGlit">Post</button>
      </div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </form>
  </div>
</template>	
<script>
import glitterApi from "../api/glitterApi"
import { ref } from 'vue';


export default {
  setup() {
    const text = ref('');
    const errorMessage = ref('');
    const userId = ref('');
    const image = ref(null);


    const onFileChange = (event) => {
      image.value = event.target.files[0];
    };
    const createGlit = async () => {
      if (errorMessage.value) return;
      const formData = new FormData();
      formData.append('text', text.value);
      formData.append('publishDate', Date.now());
      formData.append('author', userId.value);
      formData.append('image', image.value);
      try {
        const response = await glitterApi.post('/glits', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 200) {
          text.value = '';
          image.value = null;
          console.log('Glit created successfully');
        } else if (response.status === 400) {
          errorMessage.value = 'Glit cannot be empty!';
        }
      } catch (error) {
        errorMessage.value = 'Failed to create glit. Remember: glits cannot be empty!';
        console.error('Failed to create glit: ', error);
      }
    };
    return {
      text,
      errorMessage,
      createGlit,
      userId,
      onFileChange,
      image
    };
  },
};	
</script>


<style scoped>
.card {
  margin-bottom: 16px;
  padding: 20px;
  background-color: antiquewhite;
  border: 2px solid rgba(0, 0, 0, 1);
  box-shadow: 15px 15px 1px #ffa580, 15px 15px 1px 2px rgba(0, 0, 0, 1);
  margin-bottom: 2em;
}

.image {
  max-width: 100%;
}

textarea {
  flex-wrap: wrap;
  margin: auto;
  width: 100%;
  height: 100px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 1);
  border-radius: 5px;
  background-color: #f8f4e5;
  font-size: 16px;
  resize: none;
}

input.form-control {
  background: #f8f4e5;
  border: 2px solid rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 1px 1px #95a4ff, 3px 3px 1px 2px rgba(0, 0, 0, 1);
}

.button {
  display: flex;
  justify-content: end;
}

.postBtn {
  line-height: 28pt;
  padding: 0 20px;
  background: #ffa580;
  letter-spacing: 2px;
  transition: .2s all ease-in-out;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 1px 1px #95a4ff, 3px 3px 1px 2px rgba(0, 0, 0, 1);
}


.postBtn:hover {
  background-color: rgb(249, 250, 251);
}

.counter {
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
}
</style>