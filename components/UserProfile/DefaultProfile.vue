<template>
  <div class="profile-section">
    <slot name="user-avatar">
      <UserAvatar :username="user.username" :size="150" class="profile-section__avatar" />
    </slot>

    <div class="profile-section__user-info">
      <div class="profile-settings">
        <h2 class="profile-section__username">{{ user.username }}</h2>
        <slot name="username-section"></slot>
      </div>

      <div>
        <ul class="profile-stats">
          <li>
            <span class="profile-stats__count">{{ user.posts }}</span> публикаций
          </li>
          <li>
            <span class="profile-stats__count">{{ user.followers }}</span> подписчиков
          </li>
          <li>
            <span class="profile-stats__count">{{ user.following }}</span> подписки
          </li>
        </ul>
      </div>

      <slot name="description-section">
        <div v-if="user.profile_description" class="profile-description">
          <textarea readonly class="default" v-model="user.profile_description"></textarea>
        </div>
      </slot>
    </div>

    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import UserAvatar from '~/components/Avatar/UserAvatar.vue'

import User from '~/types/User'

@Component({
  components: {
    UserAvatar,
  },
})
export default class DefaultUserProfile extends Vue {
  @Prop({ type: Object, required: true }) user: User
}
</script>

<style lang="scss">
@import '~/assets/scss/components/UserProfile/Default.scss';
</style>
