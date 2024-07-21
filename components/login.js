const Login = {
    template: `
    <div id="loginPage">
        <div class="row flex">
            <div class="col-12 col-md-4 col-xl-4">
                <div class="card border-0 p-4">
                    <div class="logo flex p-1 mx-auto">
                        <img src="/resources/images/ssa_logo.png" alt="Star Graphix Logo">
                    </div>
                    <h2 class="text-center fw-bold my-2" style="font-size: 33px;">Welcome back!</h2>
                    <h4 class="text-center mb-3" style="font-size: 18px;">Log in to access your invoice dashboard.</h4>
                    <div class="email-input flex mb-4">
                        <input type="email" placeholder="Enter Email" v-model="email">
                        <iconify-icon icon="mdi:email-open-outline"></iconify-icon>
                    </div>
                    <div class="password-input flex mb-4" style="position: relative;">
                        <input v-bind:type="type" placeholder="Enter your Password" v-model="password">
                        <button class="password-button">
                            <iconify-icon v-bind:icon="eye" v-on:click="showPassword()"></iconify-icon>
                        </button>
                    </div>
                    <button class="login flex" v-on:click="login()">
                        Login
                    </button>
                    <a class="text-center mt-3" href="#">Designed & Developed By &copy; Star Graphix</a>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            email: '',
            password: '',
            type: "password",
            eye: "mdi:eye-off",
        };
    },
    methods: {

        showPassword() {
            if (this.eye == "mdi:eye-off") {
                this.eye = "bi:eye-fill";
                this.type = "text";
            } else {
                this.eye = "mdi:eye-off";
                this.type = "password";
            }
        },

        login() {

            if (this.email == 'soundar2020@gmail.com' && this.password == 'Soundar@1234') {
                this.$router.push(`/main/` + 'ssax');
            }

            else {
                const notyf = new Notyf({
                    position: {
                        x: 'right',
                        y: 'bottom',
                    },
                });

                notyf.error('Login Failed');
            }
        }
    },
};
