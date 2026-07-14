<script setup lang="ts">
import { MenuIcon } from '@lucide/vue'
import { Icon } from '@iconify/vue'

import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/site'

const route = useRoute()

const desktopLinks = computed(() =>
  siteConfig.navLinks.filter((link) => !link.mobileOnly)
)

const isActive = (href: string) =>
  href === '/'
    ? route.path === href
    : route.path === href || route.path.startsWith(`${href}/`)

const headerBackgroundStyle = computed(() => ({
  backgroundImage: siteConfig.headerImage
    ? `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('${siteConfig.headerImage}')`
    : 'linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88))',
  backgroundPosition: 'center center',
  backgroundSize: 'cover'
}))
</script>

<template>
  <header class="sticky top-0 z-40 bg-[var(--bhs-charcoal)] shadow-[0_0_20px_-10px_#363636]">
    <div
      class="mx-auto flex w-full max-w-[1200px] items-stretch bg-white"
      :style="headerBackgroundStyle"
    >
      <NuxtLink
        to="/"
        class="flex shrink-0 items-center justify-center bg-[var(--bhs-charcoal)] px-4 py-3"
        aria-label="Bountiful home"
      >
        <img id="iqh8" src="/assets/logo.png" class="" width="80"></img>
      </NuxtLink>

      <div class="w-10 shrink-0 bg-[linear-gradient(100deg,var(--bhs-charcoal),var(--bhs-charcoal)_30%,var(--tri-mid)_33%,var(--tri-mid)_60%,transparent_63%)]" />

      <NuxtLink
        to="/"
        class="hidden items-center px-4 text-[2em] leading-none font-black text-[var(--bhs-charcoal)] no-underline min-[481px]:flex"
        style="font-family: Trebuchet MS, Helvetica, sans-serif;"
      >
        {{ siteConfig.name }}
      </NuxtLink>

      <Sheet>
        <SheetTrigger as-child>
          <Button
            variant="ghost"
            size="sm"
            class="my-auto ml-auto mr-2 hidden h-auto rounded-none px-3 py-2 text-base font-semibold text-[var(--bhs-charcoal)] shadow-none hover:bg-black/5 hover:text-[var(--bhs-charcoal)] max-[992px]:inline-flex"
          >
            <MenuIcon class="size-8" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          :show-close-button="false"
          class="w-full max-w-[400px] border-0 bg-[#1e1e1e] p-6 text-[#eee]"
        >
          <div class="flex h-full flex-col">
            <SheetHeader class="border-b border-white/10 px-0 pb-4 text-left">
              <SheetTitle class="text-lg font-bold text-white">
                {{ siteConfig.name }}
              </SheetTitle>
            </SheetHeader>

            <nav class="pt-5">
              <ul class="space-y-4">
                <li
                  v-for="link in siteConfig.navLinks"
                  :key="link.href"
                >
                  <SheetClose
                    v-if="!link.disabled"
                    as-child
                  >
                    <NuxtLink
                      :to="link.href"
                      :class="cn(
                        'block text-lg no-underline transition-colors hover:text-white',
                        isActive(link.href) ? 'font-bold text-white' : 'text-white/80'
                      )"
                      :target="link.external ? '_blank' : ''"
                    >
                      <Icon v-if="link.icon" :icon="link.icon" class="size-5"/>
                      <template v-else>
                        {{ link.label }}
                      </template>
                    </NuxtLink>
                  </SheetClose>

                  <span
                    v-else
                    class="block cursor-default text-lg text-white/55"
                  >
                    <Icon v-if="link.icon" :icon="link.icon" class="size-5"/>
                    <template v-else>
                      {{ link.label }}
                    </template>
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <div class="ml-auto hidden items-center pr-4 min-[993px]:flex">
        <nav>
          <ul class="flex list-none items-center gap-[10px] p-0">
            <li
              v-for="link in desktopLinks"
              :key="link.href"
            >
              <NuxtLink
                v-if="!link.disabled"
                :to="link.href"
                :class="cn(
                  'text-base font-semibold text-[var(--bhs-charcoal)] no-underline hover:underline hover:underline-offset-4',
                  isActive(link.href) && 'underline underline-offset-4'
                )"
                :target="link.external ? '_blank' : ''"
              >
                <Icon v-if="link.icon" :icon="link.icon" class="size-5"/>
                <template v-else>
                  {{ link.label }}
                </template>
              </NuxtLink>

              <span
                v-else
                class="cursor-default text-base font-semibold text-[var(--bhs-red)] opacity-70"
              >
                <Icon v-if="link.icon" :icon="link.icon" class="size-5"/>
                <template v-else>
                  {{ link.label }}
                </template>
              </span>
            </li>
          </ul>
        </nav>
      </div>

      <div class="w-10 shrink-0 bg-[linear-gradient(100deg,transparent,transparent_30%,var(--tri-mid)_33%,var(--tri-mid)_60%,var(--bhs-charcoal)_63%)]" />
    </div>
  </header>
</template>
