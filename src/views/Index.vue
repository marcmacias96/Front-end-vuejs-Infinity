<template >
  <div class="container p-5">
    <div class="card">
      <div class="card-header bg-dark">
        <h3 class="card-title text-white">
          <i class="far fa-image"></i> Upload an Image
        </h3>
      </div>

      <div class="card-body">
        <form action method="POST" @submit.prevent="cretaImage">
          <div class="form-group">
            <div class="input-group">
              <div class="custom-file">
                <input
                  @change="upload"
                  ref="file"
                  type="file"
                  name="image"
                  class="custom-file-input"
                  id="image"
                  required
                />
                <label class="custom-file-label" for="image">Choose file</label>
              </div>
            </div>
          </div>

          <div class="form-group">
            <input
              type="text"
              name="title"
              class="form-control"
              v-model="title"
              placeholder="Title for the Image"
              required
            />
          </div>
          <div class="form-group">
            <textarea
              name="description"
              rows="2"
              class="form-control"
              v-model="description"
              placeholder="Deescription for the Image"
              required
            ></textarea>
          </div>
          <div class="form-group">
            <button class="btn btn-success">
              <i class="fa fa-upload"></i> Upload Image
            </button>
          </div>
        </form>
      </div>

      <div class="card mt-2">
        <div class="car-header bg-dark text-white">
          <h3>
            <i class="far fa-images">Recient Upload</i>
          </h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-4" :key="image.id" v-for="image in getImages">
              <router-link :to="{name : 'viewImage', params: { id : image._id }}">
                <img :src="url + image.fileName" alt=" " class="w-100 h-100 img-thumbnail" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { log } from 'util';

const SUB_QUERY = gql`subscription photos{
  photos {
  _id
  title
  description
  fileName
  uniqueId
  }
}`;

export default {
  data() {
    return {
      title: "",
      description: "",
      file: "",
      url: "http://localhost:3000/static/upload/"
    };
  },
  methods: {
    upload() {
      this.file = this.$refs.file.files[0];
    },
    cretaImage() {
      this.$apollo.mutate({
        mutation: gql`
          mutation($input: ImageInput!, $usr_id: ID!) {
            createImage(input: $input, usr_id: $usr_id) {
              name
            }
          }
        `,
        variables: {
          input: {
            title: this.title,
            description: this.description,
            file: this.file
          },
          usr_id: "5d262f4eef7d85219caaecc4"
        },
        updateQueries : {
          getImages :  (previousResult, { mutationResult }) => {
            return {
               getImages : [
                  ...previousResult.getImages,
                  mutationResult.data.photos
               ]
             }
          }
        }
      });
      
    }
  },
  apollo: {
    getImages() {
      return {
        query: gql`
          query getImages {
            getImages {
              _id
              title
              description
              fileName
              uniqueId
            }
          }
        `,
        fetchPolicy: "cache-and-network",

        subscribeToMore: [{
          document : SUB_QUERY,
          updateQuery : (previousResult, { subscriptionData }) => {
            
            //this.$router.push({ name : 'viewImage', params: {id: subscriptionData.data.photos._id }})
             return {
               getImages : [
                  ...previousResult.getImages,
                  subscriptionData.data.photos
               ]
             }
          }
        }]
      };
    }
  }
};
</script>
