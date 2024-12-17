import { defineComponent, createApp } from 'vue'

const Comp = defineComponent({
    name: 'CurrentDate',
    setup() {
        function formatAsLocalDate(date) {
            return new Date(date).toLocaleDateString(undefined, { dateStyle: 'long' });
        }

        const currentDate = new Date();

        return {
            formatAsLocalDate,
            currentDate
        };
    },
    template: `<div>Сегодня {{ formatAsLocalDate(currentDate) }}</div>`
});


createApp(Comp).mount("#app");