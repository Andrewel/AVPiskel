<template>
  <v-card flat tile>
    <!--
      <article class="covers" v-for="(user, idx) in users" :key="idx">
        <div>
          <img
            style="margin: 10px"
            :src="user.image"
            height="291px"
            width="192px"
          />
          <p>{{ user.name }}</p>
          <hr />
          <button class="button" @click="deleteComic(user.id);">Delete</button>
        </div>
      </article>
    -->
    <v-toolbar color="pink" dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title>My Gallery</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="search"> <v-icon>search</v-icon> </v-btn>
      <v-btn icon @click="home"> <v-icon>arrow_back_ios</v-icon> </v-btn>
    </v-toolbar>

    <v-container
      v-for="type in types"
      :key="type"
      fluid
      grid-list-md
      grey
      lighten-4
    >
      <v-subheader>{{ type }}</v-subheader>

      <v-layout row wrap v-if="type == 'My Likes'">
        <v-spacer></v-spacer>
        <v-flex v-for="user in users" :key="user.key" xs12 sm6 md4>
          <v-card>
            <!--
              <v-img
                :src="`https://picsum.photos/200/300?image=${getImage()}`"
                height="300px"
              >
                <span
                  class="headline white--text pl-3 pt-3"
                  v-text="card.title"
                ></span>
              </v-img>
            -->
            <v-img :src="user.image" height="200px">
              <span
                class="headline white--text pl-3 pt-3"
                v-text="user.name"
              ></span>
            </v-img>

            <v-card-actions class="white justify-center">
              <span
                class="headline black--text pl-0 pt-0"
                v-text="user.name"
              ></span>
              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
                class="white--text"
                fab
                icon
                small
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="type == 'Me Likes'">
        <v-spacer></v-spacer>
        <v-flex v-for="MeLike in MeLikes" :key="MeLike.key" xs12 sm6 md4>
          <v-card>
            <v-img :src="MeLike.image" height="200px">
              <span
                class="headline white--text pl-3 pt-3"
                v-text="MeLike.name"
              ></span>
            </v-img>

            <v-card-actions class="white justify-center">
              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
                class="white--text"
                fab
                icon
                small
                :href="MeLike.linkedln"
                target="_blank"
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
              <v-icon color="orange darken-2" v-if="MeLike.superlike == true"
                >star</v-icon
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="type == 'Matches'">
        <v-spacer></v-spacer>
        <v-flex v-for="match in matches" :key="match.key" xs12 sm6 md4>
          <v-card>
            <v-img :src="match.image" height="200px">
              <span
                class="headline white--text pl-3 pt-3"
                v-text="match.name"
              ></span>
            </v-img>

            <v-card-actions class="white">
              <span
                class="headline black--text pl-0 pt-0"
                v-text="match.name"
              ></span>
              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
                class="white--text"
                fab
                icon
                small
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import firebase from "firebase/app";
import { db } from "../main";
export default {
  name: "likes",
  data() {
    return {
      uid: firebase.auth().currentUser.uid,
      users: [],
      matches: [],
      MeLikes: [],
      types: ["My Likes", "Me Likes", "Matches"],
      socials: [
        {
          icon: "fab fa-facebook",
          color: "indigo"
        },
        {
          icon: "fab fa-linkedin",
          color: "cyan darken-1"
        },
        {
          icon: "fab fa-instagram",
          color: "red lighten-3"
        }
      ]
    };
  },
  firestore() {
    return {
      users: db
        .collection("users")
        .doc(this.uid)
        .collection("MyLikes")
        .where("like", "==", true),
      MeLikes: db
        .collection("users")
        .doc(this.uid)
        .collection("MeLikes")
        .where("like", "==", true),
      matches: db
        .collection("users")
        .doc(this.uid)
        .collection("Matches"),
      User: db.collection("users").where("uid", "==", this.uid)
    };
  },
  methods: {
    search() {
      this.$router.replace("/likes2");
    },
    home() {
      this.$router.replace("/home");
    },
    getImage() {
      const min = 550;
      const max = 560;

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
</script>

<style></style>
