<template>
<VApp id="inspire">
    <VNavigationDrawer v-model="drawer" fixed app>
        <VList dense>
            <VListTile @click="">
                <VListTileAction>
                    <VIcon>home</VIcon>
                </VListTileAction>
                <VListTileContent>
                    <VListTileTitle>Home</VListTileTitle>
                </VListTileContent>
            </VListTile>
            <VListTile @click="">
                <VListTileAction>
                    <VIcon>contact_mail</VIcon>
                </VListTileAction>
                <VListTileContent>
                    <VListTileTitle>Contact</VListTileTitle>
                </VListTileContent>
            </VListTile>
        </VList>
    </VNavigationDrawer>
    <VToolbar color="primary" dark fixed app>
        <VToolbarSideIcon @click.stop="drawer = !drawer"></VToolbarSideIcon>
        <VToolbarTitle>Application</VToolbarTitle>
        <VSpacer></VSpacer>
        <VBtn icon @click="logOut">
            <VIcon>exit_to_app</VIcon>
        </VBtn>
    </VToolbar>
    <VContent>
        
    </VContent>
</VApp>
</template>

<script>
import router from "../router";
import axios from "axios";
import store from "../store";

export default {
  name: "Frame",

  data() {
    return {
      drawer: null
    };
  },

  methods: {
    logOut() {
      axios
        .get(store.state.baseRemoteUrl + "/api/auth/logout", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: store.state.token
          }
        })
        .then(function(response) {
          console.log(response);
          store.dispatch("auth", {
            auth: false,
            token: null
          });
          router.push({ path: "/login" });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  display: block;
  max-width: 100%;
}
</style>
