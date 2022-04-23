<template>
  <v-app>
    <div v-if="isAuthenticated">
      <v-app-bar
        color="teal-darken-4"
        image="https://picsum.photos/1920/1080?random"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{ $t('app.title') }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" icon="mdi-magnify"></v-btn>

        <v-btn class="py-10" variant="text" icon="mdi-dots-vertical" id="menu-activator"></v-btn>
      </v-app-bar>

    <v-menu activator="#menu-activator" anchor="bottom end" origin="auto" v-model="menu">
      <v-card>
        <v-list>
          <v-list-item value="index" @click="account();menu = false">
            <v-icon  class="mr-3">
              mdi-account
            </v-icon>
            <v-list-item-title>
              {{ t('app.rightMenu.account') }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item value="index" @click="logout();menu = false">
            <v-icon  class="mr-3">
              mdi-logout
            </v-icon>
            <v-list-item-title>
                {{ t('app.rightMenu.logout') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

      <v-navigation-drawer
        v-model="drawer"
        temporary
        bottom
      >
        <v-list-item value="index" @click="home();drawer = false">
          <v-icon>
            mdi-home
          </v-icon>
          <v-list-item-title class="ma-5">
              {{ t('app.leftMenu.home') }}
          </v-list-item-title>
        </v-list-item>
      </v-navigation-drawer>
    </div>

    <v-main
    class="px-6">
      <router-view
      class="router-view mx-auto"
      />
    </v-main>

    <global-error />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { useI18n } from 'vue-i18n'
import { logout } from './services/router.service'
import router from './router'
import GlobalError from './components/GlobalError.vue'

export default defineComponent({
  name: 'App',

  components: {
    'global-error': GlobalError,
  },

  setup () {
    const { t } = useI18n()
    return {
      t,
    }
  },
  data () {
    return {
      drawer: false,
      menu: false,
      group: null,
    }
  },
  watch: {
    group () {
      this.drawer = false
    },
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
    }),
  },
  methods:{
    logout() {
      logout().then(() => {
          router.push('/login')
      })
    },
    account() {
      router.push('/account')
    },
    home() {
      router.push('/home')
    }
  }
})
</script>

<style lang="scss">
@media (min-width: 1000px) {
  .router-view {
    max-width:60%
  }
}
</style>


