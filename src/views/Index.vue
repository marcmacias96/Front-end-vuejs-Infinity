<template>
<div class="card">

  <div class="card-header bg-dark">
    <h3 class="card-title text-white">
      <i class="far fa-image"></i> Upload an Image
    </h3>
  </div>

  <div class="card-body">
    <form action="" method="POST"  @submit.prevent="cretaImage">

      <div class="form-group">
        <div class="input-group">
          <div class="custom-file">
            <input @change="upload" ref="file" type="file" name="image" class="custom-file-input"  id="image"  required/>
            <label class="custom-file-label" for="image">Choose file</label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <input type="text" name="title" class="form-control" v-model="title" placeholder="Title for the Image" required>
      </div>
      <div class="form-group">
        <textarea name="description" rows="2" class="form-control" v-model="description" placeholder="Deescription for the Image" required></textarea>
      </div>
      <div class="form-group">
        <button class="btn btn-success" >
          <i class="fa fa-upload"></i> Upload Image
        </button>
      </div>
    </form>
  </div>
 
  <div card mt-2>
    <div class="car-header bg-dark text-white">
      <h3><i class="far fa-images">Recient Upload</i></h3>
    </div>
    <div class="card-body">

    </div>
  </div>

</div>


</template>

<script>
import gql from 'graphql-tag'
export default {
    data () {
        return  {
            title : '',
            description :'',
            file :'',
            images : []
        }
    },
    methods : {
        upload () {    
          this.file = this.$refs.file.files[0];
        },
        cretaImage () {

            this.$apollo
            .mutate({
                mutation:gql`
                mutation ($input : ImageInput!, $usr_id : ID!) {
                    createImage (input : $input, usr_id : $usr_id) {
                         name
                    }
                } 
            `,
            variables: {
              input: {
                title : this.title,
                description : this.description,
                file :this.file
              },
              usr_id : "5d216b1f0e96d74060569b8e"
            },
            context: {
              hasUpload: true
            }
          })
        },
        getImages () {
          images.push(this.$apollo
            .query({
              query : gql`
                query () {
                  getImages {
                    title
                  }
                }
              `,
              variables : {

              }
            }))
        }

    }
}
</script>
