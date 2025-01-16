<script>
/**
 * Top-users component
 */
export default {
    data() {
        return {
            users: [{
                    profile: require("~/assets/images/users/avatar-4.jpg"),
                    name:  this.$auth.user.username,
                    email: this.$auth.user.email,
                    status: "Success",
                },
              
            ],
        };
    },
};
</script>

<template>
<div class="col-xl-4s">
    <div class="card">
        <div class="card-body">
           
            <h4 class="card-title mb-4">{{ $t("pages.dashboard.widgets.myprofile") }}</h4>

            <div data-simplebar style="max-height: 336px;">
                <div class="table-responsive">
                    <table class="table table-borderless table-centered table-nowrap">
                        <tbody>
                            <tr v-for="(item, index) in users" :key="index">
                                <td style="width: 20px;">
                                    <img :src="item.profile" class="avatar-xs rounded-circle" alt="..." />
                                </td>
                                <td>
                                    <h6 class="font-size-15 mb-1 font-weight-normal">{{item.name}}</h6>
                                    <p class="text-muted font-size-13 mb-0">
                                        <i class="mdi mdi-email"></i>
                                        {{item.email}}
                                    </p>
                                </td>
                                <td>
                                    <span class="badge font-size-12" :class="{'bg-soft-success': item.status === 'Success',
                      'bg-soft-danger': item.status === 'Cancel',
                      'bg-soft-info': item.status === 'Active',
                      'bg-soft-warning': item.status === 'Pending'}">{{item.status}}</span>
                                </td>
                                <td class="text-muted font-weight-semibold text-right">
                                    <i class="icon-xs icon mr-2 text-success" data-feather="trending-up"></i>
                                    {{item.price}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- enbd table-responsive-->
            </div>
            <!-- data-sidebar-->
        </div>
        <!-- end card-body-->
    </div>
    <!-- end card-->
</div>
<!-- end col -->
</template>
