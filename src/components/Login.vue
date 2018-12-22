<template>
<VApp>
	<VContent class="login-page">
		<VContainer fluid fill-height>
			<VLayout align-center justify-center>
				<VFlex xs12 sm8 md4>
					<VCard class="login-form">
						<VToolbar dark color="form-header primary">
							<VToolbarTitle>Authorization</VToolbarTitle>
						</VToolbar>
						<VCardText class="form-content">
							<VForm>
								<VTextField prepend-icon="person" name="login" label="Login" v-model="loginData.email" type="text"></VTextField>
								<VTextField id="password" prepend-icon="lock" name="password" label="Password" v-model="loginData.password" type="password"></VTextField>
							</VForm>
						</VCardText>
						<VCardActions class="form-footer">
							<VBtn color="login-btn primary" @click="login()">Login</VBtn>
						</VCardActions>
					</VCard>
				</VFlex>
			</VLayout>
		</VContainer>
	</VContent>
</VApp>
</template>

<script>
import router from "../router";
import axios from "axios";
import store from "../store";

export default {
  name: "Login",

  data() {
    return {
      loginURL: store.state.baseRemoteUrl + "/api/auth/login",
      loginData: {
        email: "",
        password: "",
        rememberMe: false
      },
      emptyLogin: false,
      emptyPassword: false
    };
  },

  methods: {
    login() {
      axios
        .post(this.loginURL, this.loginData)
        .then(
          function(response) {
            if (response.data.access_token != undefined) {
              store.dispatch("auth", {
                auth: true,
                token:
                  response.data.token_type + " " + response.data.access_token
              });
              router.push({ path: "/" });
            }
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>



<style lang="scss" scoped>
.login-page {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #2980b9 0%, #2980b9 - 80 100%);
  // background: #eee - 20;

  & * {
    box-sizing: border-box;
  }
}

.login-form {
  margin: 0 auto;
  max-width: 360px !important;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  .form-header {
    // height: 80px;
    padding: 0 0 0 10px !important;
    box-shadow: none;
  }

  .form-content {
    padding: 30px 30px 30px 30px;
  }

  .form-footer {
    padding: 0px 30px 30px 30px;

    .login-btn {
      width: 100%;
    }
  }
}
</style>
