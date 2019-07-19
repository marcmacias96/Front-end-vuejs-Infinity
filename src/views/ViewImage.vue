<template>
  <div class="container p-5">
    <ApolloQuery
      :query="gql =>  gql`
      query($id : ID!) {
        getImage (id : $id) {
          _id
          title
          description
          fileName
          uniqueId
          likes
          comments {
            comment
            postedBy
          }
        }
      }
    `"
      :variables="{id}"
    >
      <template v-slot="{ result: { loading, arror, data } }">
        <div v-if="data">
          <div class="card-header bg-dark">
            <h3 class="card-title text-white">
              <i class="far fa-image"></i> INFINITY
            </h3>
          </div>

          <div class="card-header d-flex justify-content-between align-items-center ">
            <h2>{{data.getImage.title}}</h2>
          </div>

          <div class="card-body">
            {{data.getImage.description}}
            <div class="text-center">
              <img :src="url+data.getImage.fileName" class="img-fluid" />
            </div>
          </div>

          <div class="card-footer d-flex justify-content-between align-items-center">
            <button class="btn btn-success" id="btn-like" @click="like">
              <i class="fas fa-thumbs-up"></i> Like
            </button>
            Likes : {{data.getImage.likes}}
          </div>

          <div class="card-header d-flex justify-content-between align-items-center">
            <h3>Comentarios</h3>
          </div>

          <div class="card-body">
            <blockquote id="post-comment">
              <form method="POST" @submit.prevent="AddComment">
                <div class="form-group">
                  <textarea
                    name="comment"
                    class="form-control"
                    rows="2"
                    placeholder="Escriba tu Comentario"
                    v-model="comment"
                  ></textarea>
                </div>
                <div class="form-group">
                  <button class="btn btn-success" id="btn-comment">
                    <i class="fa fa-comment"></i> Enviar
                  </button>
                </div>
              </form>
            </blockquote>
            <ul class="list-group p-4">
              <div class="col-md-4" :key="comment.id" v-for="comment in data.getImage.comments">
                <li class="list-group-item">
                  <div class="row">
                    <a href="#" class="col text-center">
                      <img
                        src="http://localhost:3000/static/icons/icon.jpg"
                        alt
                        class="w-100 h-100"
                      />
                    </a>
                    <blockquote class="col">
                      <p class="lead">{{comment.comment}}</p>
                      <footer class="blockquote-footer"></footer>
                    </blockquote>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import gql from "graphql-tag";
const SUB_QUERY = gql`
  subscription photos {
    photos {
      _id
      title
      description
      fileName
      uniqueId
      comments {
        _id
        comment
        postedBy
      }
    }
  }
`;
export default {
  data() {
    return {
      id: (this.id = this.$route.params.id),
      getImage: "",
      url: "http://localhost:3000/static/upload/",
      comment: "",
      likes: 0
    };
  },
  methods: {
    AddComment() {
      this.$apollo.mutate({
        mutation: gql`
          mutation($input: CommentInput!, $img_id: ID!) {
            createComment(input: $input, img_id: $img_id) {
               _id
              title
              description
              fileName
              uniqueId
              likes
              comments {
                _id
                comment
                postedBy
              }
            }
          }
        `,
        variables: {
          input: {
            comment: this.comment,
            postedBy: "5d22b0d15e51c91724684448"
          },
          img_id: this.id
        },
        updateQueries: {
          getImage : (previousResult, { mutationResult }) => {    
            return {
              getImage: [
                previousResult.getImage.comments.push(mutationResult.data.createComment.comments),
              ]
            };
          }
        }
      });
    },
    like() {
      this.$apollo.mutate({
        mutation: gql`
          mutation($img_id: ID!) {
            like(img_id: $img_id) {
               _id
              title
              description
              fileName
              uniqueId
              likes
              comments {
                _id
                comment
                postedBy
              }
            }
          }
        `,
        variables: {
          img_id: this.id
        },
        updateQueries: {
          getImage : (previousResult, { mutationResult }) => {    
            return {
              getImage: [
                previousResult.getImage.likes = mutationResult.data.like.likes,
              ]
            };
          }
        }
      });
    }
  }
};
</script>

