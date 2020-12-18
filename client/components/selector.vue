<template lang="pug">
v-app.selector(:dark="$vuetify.theme.dark")
  nav-header
  v-main
    v-divider
    v-container
      v-row
        v-col(cols="12", md="4").card-column
          a.card(href="/Аэрофотосъемка/home", :class="{disabled: !afs}")
            img.v-img(src="/_assets/img/afs.png")
            h3.white--text Аэрофотосъемка и 3D-город
        v-col(cols="12", md="4").card-column
          a.card(href="/Космосъемка/home", :class="{disabled: !space}")
            img.v-img(src="/_assets/img/space.png")
            h3.white--text Космосъемка
        v-col(cols="12", md="4").card-column
          a.card(href="/DataScout/home", :class="{disabled: !data}")
            img.v-img(src="/_assets/img/data.png")
            h3.white--text DataScout
      v-row
        v-col(cols="12")
          a.card.d-flex.flex-row.align-items-center.repo(href="/repo")
            h3.white--text(style="max-height: 1.5rem;") Репозиторий
            img.ml-auto(src="/_assets/img/cloud.png", style="padding: 16px; max-height: 145px;")


</template>

<script>
import { get, sync } from "vuex-pathify";
import _ from "lodash";
import gql from "graphql-tag";
import { result } from "validate.js";

export default {
  data() {
    return {
      groups: [],
      afs: false,
      space: false,
      data: false,
    };
  },
  mounted() {
    this.$apollo
      .query({
        query: gql`
          query {
            users {
              profile {
                groups
              }
            }
          }
        `,
        fetchPolicy: "network-only",
      })
      .then((res) => {
        this.groups = _.get(res, "data.users.profile.groups");
        this.afs = _.includes(this.groups, "afs");
        this.space = _.includes(this.groups, "space");
        this.data = _.includes(this.groups, "data");
      });
  },
  computed: {
    userId: get("user/id"),
  },
};
</script>

<style lang="scss" scoped>
$blue-accent: #333347;

img{
  object-fit: cover;
}

.card{
  //max-width: 450px;
  background-color: $blue-accent;
  border-radius: 16px;
  box-shadow: 0px 10px 20px rgba(117, 117, 117, 0.15);
  display: block;
  text-decoration: none;

  &.disabled{
    pointer-events: none;
    cursor: default;
    filter: grayscale(100%);
    box-shadow: none;
  }
}

.v-img{
  padding: 16px;
  object-fit: cover;
  height: 100%;
  width: 100%;
  min-height: 320px;
  max-height: 467px;
}

.repo{
  justify-content: center;
  align-items: center;
}

h3{
  padding-left: 16px;
  padding-bottom: 32px;
}
</style>
