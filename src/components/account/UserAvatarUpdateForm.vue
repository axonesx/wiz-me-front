<template>
   <v-row justify="center">
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      persistent
      max-width="100%"
    >
      <!-- v-if="!this.files" -->
      <template v-slot:activator="{ props }">
        <EditButton v-bind="props"  :textBtn="$t('accountPage.updateUser.form.avatarTooltip')"></EditButton>
      </template>
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <span class="text-h5">{{ $t('accountPage.updateUser.form.avatarTitle') }}</span>
          <v-icon
          class="close-icon"
          v-if="cropper"
          @click="cropper=false;files=[]">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-form
            @change="disableButton"
            @blur="disableButton"
            enctype="multipart/form-data"
            >
            <v-row>
              <cropper
                v-if="cropper"
                class="cropper"
                ref="cropper"
                :src="image"
                :stencil-props="{
                  aspectRatio: 1/1
                }"
              />
              <v-file-input
                v-else
                v-model="files"
                ref="files"
                @change="loadImage($event)"
                accept="image/*"
                label="File input"
                filled
                prepend-icon="mdi-camera"
              >
              <template v-slot:label>
                {{ $t('accountPage.updateUser.form.file') }}
              </template></v-file-input>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="mt-2">
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            text
            @click="resetDialog"
          >
            {{ $t('accountPage.updateUser.form.closeBtn') }}
          </v-btn>
          <v-btn
            color="blue-darken-1"
            text
            @click="deleteAvatar"
            :disabled="user.avatarPath===null"
          >
            <v-progress-circular
              class='mx-auto'
              v-if="deleteAvatarStatus==='loading'"
              indeterminate
            ></v-progress-circular>
            <div v-else>{{ $t('accountPage.updateUser.form.deleteBtn') }}</div>
          </v-btn>
          <v-btn
            color="blue-darken-1"
            text
            :disabled="!valid"
            @click="uploadAvatar"
          >
            <v-progress-circular
              class='mx-auto'
              v-if="uploadAvatarStatus==='loading'"
              indeterminate
            ></v-progress-circular>
            <div v-else>{{ $t('accountPage.updateUser.form.saveBtn') }}</div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { store } from '../../store'
import EditButton from '../EditButton.vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import { isAllItemsExist } from '../../services/utils.service'

export default defineComponent({
  name: 'UserAvatarUpdateForm',
  setup () {
    return {
      v$: useVuelidate(),
    }
  },
  components:{
      EditButton,
      Cropper,
  },

  data() {
    return {
      files: [],
      image: '',
      valid: false,
      cropper: false,
      dialog: false,
    }
  },

  validations() {
    return {
      files: {
          required,
          $lazy: true
      },
    }
  },

  computed: {
    ...mapGetters({
      user: 'getProfile',
      uploadAvatarStatus: 'getUserUploadAvatarRequestStatus',
      deleteAvatarStatus: 'getUserDeleteAvatarRequestStatus',
    }),
  },
  methods: {
    resetDialog () {
      this.dialog=false
      this.files=[]
      this.cropper=false
      this.valid=false
    },
    disableButton () {
      this.valid = isAllItemsExist([this.files])
    },
    loadImage() {
      // Ensure that you have a file before attempting to read it
      this.cropper = true
      if (this.files && this.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.image = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(this.files[0]);
      }
    },
    uploadAvatar () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      const { canvas } = this.$refs.cropper.getResult()
      if (canvas) {
        canvas.toBlob((file: Blob) => {
          store.dispatch('uploadAvatar', file ).then(() => {
            this.resetDialog()
          })
        }, "image/jpeg")
      }
    },
    deleteAvatar () {
      store.dispatch('deleteAvatar').then(() => {
        this.resetDialog()
      })
    }
  },
})
</script>

<style scoped>
  .close-icon:hover {
    cursor: pointer;
  }
  .cropper {
    height: 600px;
    width: 600px !important;
    background: #DDD;
  }
  .v-btn--disabled {
    color: grey !important;
  }
  .v-overlay {
    padding:0%;
  }
</style>
<style>
  .v-overlay__content {
    max-height: 100% !important;
    max-width: 100% !important;
  }
</style>