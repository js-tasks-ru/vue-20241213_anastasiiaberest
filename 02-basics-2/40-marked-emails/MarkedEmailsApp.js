import { defineComponent, ref, computed } from 'vue'

export const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
]

export default defineComponent({
  name: 'MarkedEmailsApp',

  setup() {
    const searchQuery = ref('')

    const markedItems = computed(() => {
      if (!searchQuery.value) return new Array(emails.length).fill(false) 
      const newQuery = searchQuery.value.toLowerCase()
      return emails.map((email) =>
        email.toLowerCase().includes(newQuery)
      ) 
    })

    return {
      searchQuery,
      emails,
      markedItems,
    }
  },

  template: `
    <div>
      <div class="form-group">
        <input
          type="search"
          aria-label="Search"
          v-model="searchQuery"
          placeholder="Search for an email"
        />
      </div>
      <ul aria-label="Emails">
        <li
          v-for="(email, index) in emails"
          :key="index"
          :class="{'marked': markedItems[index]}"
        >
          {{ email }}
        </li>
      </ul>
    </div>
  `,
})
