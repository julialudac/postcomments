<template>
  <div class="container">
    <hr>
    <h1>Comments section</h1>
    <div>
      <label for="username">Your name or pseudo: </label>
      <input type="text" id="username" v-model="pseudo"> <br/>
      <textarea id="create-post" placeholder="Say Something..." 
                v-model="text">
      </textarea>
      <button v-on:click="createPost">Post!</button>
    </div>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="post-container">
      <div class="post" 
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"   
      >
        <p class="text">{{ post.text }}</p>
        <p class="datetext"><em>{{ getFormattedDate(post) }}</em></p>
      </div>
    </div>
  </div>
</template>

<script>
 
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      pseudo: '',
      text: ''
    };
  },
  async created() {
    try {
      this.posts =  await PostService.getPosts();
    } catch(err) {
      this.error = err.message; 
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      // We call it again to take into account the update.
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id); 
      // We call it again to take into account the update.
      this.posts = await PostService.getPosts();
    },
    getFormattedDate(post) {
      const fullDate = post.createdAt;
      return `${fullDate.getDate()}/${fullDate.getMonth()}/${fullDate.getFullYear()} `
              + `at ${fullDate.getHours()}:${fullDate.getMinutes()}:${fullDate.getSeconds()}`;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
textarea {
  height: 50px;
  width: 50%;
}
.post {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  background: #99d9eA;
  word-break: break-word;
}
.datetext {
  text-align: end;
}
</style>
