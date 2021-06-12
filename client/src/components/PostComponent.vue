<template>
  <div class="container">
    <hr>
    <h1>Comments section</h1>
    <!-- TODO note a div we create to contain the effect of our
    create post action, i.e. allowing the user to create posts -->
    <div>
      <!-- TODO note Here is an example of using v-model. I think this allows to
      put what the value attribute has into the variable that is the value of v-model
      text = the attribute text
      Oh in fact the values of the v- directives are attributes! And they are 
      not used with the {{}} -->
      <label for="username">Your name or pseudo: </label>
      <input type="text" id="username" v-model="pseudo"> <br/>
      <textarea id="create-post" placeholder="Say Something..." 
                v-model="text">
      </textarea>
      <!-- example of use of v-on directive -->
      <button v-on:click="createPost">Post!</button>
      

    </div>
    <!-- TODO note v-for and v-if are attributes to add to an html element -->
    <p class="error" v-if="error">{{ error }}</p>
    <!-- TODO note a div we create to contain the effect of 
    our display post action, i.e. diplay the posts -->
    <div class="post-container">
      <!-- TODO note 2 arguments: post and index if we want to have the index -->
      <!-- TODO note wtf? posts not in {{}} -->
      <!-- TODO note v-bind is used for TODO -->
      <!-- TODO note v-on is used for events -->
      <div class="post" 
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"   
      >
        <!-- TODO note - We have pieces of JS inside Vue elements!  
        - Seems given a date in a string form, we can extract 
        pieces of date details with functions like getDate, getMonth, getFullYear-->
        <p class="text">{{ post.text }}</p>
        <!-- TODO post.author: add this functionalyy -->
        <p class="datetext"><em>{{ getFormattedDate(post) }}</em></p>
      </div>
    </div>
  </div>
</template>

<script>
// TODO node: As we can see, the script main function will finally be to export
// the component so we can use its states or/and attributes that work with extrapolation.
// + methods liknked to it. 
// Here, only its state

// TODO note: Yes, it's well .. 
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  // TODO note: data() is your component's state
  // It is a function (and not a key!) that returns a js object that contains
  // the attributes we attach to the component we export
  data() {
    return {
      posts: [],
      error: '',
      pseudo: '',
      text: ''
    };
  },
  // Where is this method called? Is it at load time?
  async created() {
    try {
      // TODO note: What is that this pointing? -> it's the component!
      this.posts =  await PostService.getPosts();
    } catch(err) {
      // TODO note: to get the message displayed by the error, field message
      this.error = err.message; 
    }
  },
  // TODO note: methods object not called at load time?
  methods: {
    // TODO note: At the time we call it, this.text is filled when?? TODO
    // We remark here the function doesn't take a param. Instead it takes a state value!
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
