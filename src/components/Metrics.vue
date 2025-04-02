<script setup lang="ts">
import { ref, computed } from 'vue';

// Входные данные для расчетов
const revenue = ref(0);
const cost = ref(0);
const operationalCost = ref(0);
const initialInvestment = ref(0);
const discountRate = ref(0.1);
const periods = ref(5);
const cashFlows = ref([0, 0, 0, 0, 0]);

// Метрики прибыльности
const margin = computed(() => ((revenue.value - cost.value) / revenue.value) * 100);
const operationalMargin = computed(() => ((revenue.value - operationalCost.value) / revenue.value) * 100);
const profitability = computed(() => revenue.value - cost.value - operationalCost.value);

// Финансовые метрики
const roi = computed(() => ((profitability.value - initialInvestment.value) / initialInvestment.value) * 100);
const npv = computed(() => {
    return cashFlows.value.reduce((acc, cf, i) => acc + cf / Math.pow(1 + discountRate.value, i + 1), -initialInvestment.value);
});
const irr = computed(() => discountRate.value + (npv.value / initialInvestment.value) * 0.1);
const paybackPeriod = computed(() => {
    let cumulativeCashFlow = -initialInvestment.value;
    for (let i = 0; i < cashFlows.value.length; i++) {
        cumulativeCashFlow += cashFlows.value[i];
        if (cumulativeCashFlow >= 0) return i + 1;
    }
    return 'Не окупается';
});

// Метрики продукта
const mrr = ref(0); // Ежемесячный доход с подписки
const numberOfCustomers = ref(0); // Количество клиентов
const marketingCosts = ref(0); // Затраты на маркетинг
const customerLifetime = ref(12); // Средний срок жизни клиента в месяцах
const customerAcquisition = ref(0); // Затраты на привлечение одного клиента
const conversionRate = ref(0.05); // Коэффициент конверсии

// Расчеты для метрик продукта
const ltv = computed(() => {
    return mrr.value * customerLifetime.value;
});

const cac = computed(() => {
    if (numberOfCustomers.value > 0 && marketingCosts.value > 0) {
        return marketingCosts.value / numberOfCustomers.value;
    }
    return 0;
});

const ltvToCacRatio = computed(() => {
    if (cac.value > 0) {
        return (ltv.value / cac.value).toFixed(2); // LTV/CAC
    }
    return 'Не доступно';
});

const conversionRatio = computed(() => {
    return (conversionRate.value * 100).toFixed(2);
});

const monthlyRecurringRevenue = computed(() => {
    return numberOfCustomers.value * mrr.value;
});
</script>

<template>
    <div class="max-w-2xl mx-auto bg-gray-50 p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-4 text-gray-700">Калькулятор бизнес-метрик</h2>

        <!-- Ввод финансовых данных -->
        <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-700">Финансовые данные</h3>
            <div class="grid grid-cols-2 gap-4">
                <label class="flex flex-col text-gray-600">
                    <span>Выручка:</span>
                    <input type="number" v-model="revenue"
                        class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
                    <span class="text-sm text-gray-500">Общая сумма, полученная от продаж товаров или услуг.</span>
                </label>
                <label class="flex flex-col text-gray-600">
                    <span>Себестоимость:</span>
                    <input type="number" v-model="cost"
                        class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
                    <span class="text-sm text-gray-500">Сумма расходов на производство товаров или оказание
                        услуг.</span>
                </label>
                <label class="flex flex-col text-gray-600">
                    <span>Операционные затраты:</span>
                    <input type="number" v-model="operationalCost"
                        class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
                    <span class="text-sm text-gray-500">Затраты на ведение бизнеса, не связанные с производством.</span>
                </label>
                <label class="flex flex-col text-gray-600">
                    <span>Начальные инвестиции:</span>
                    <input type="number" v-model="initialInvestment"
                        class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
                    <span class="text-sm text-gray-500">Сумма первоначальных вложений в бизнес.</span>
                </label>
            </div>
        </div>

        <!-- Ввод расчетных данных для продукта -->
        <div class="mt-6 space-y-4">
            <h3 class="text-lg font-semibold text-gray-700">Метрики продукта</h3>
            <div class="grid grid-cols-2 gap-4">
                <label class="flex flex-col text-gray-600">
                    <span>MRR (ежемесячный доход):</span>
                    <input type="number" v-model="mrr"
                        class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
                    <span class="text-sm text-gray-500">Доход, который компания получает ежемесячно от подписок.</span>
                </label>
                <label class="flex flex-col text-gray-600">
                    <span>Количество клиентов:</span>
                    <input type="number" v-model="numberOfCustomers"
                        class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
                    <span class="text-sm text-gray-500">Общее количество клиентов компании.</span>
                </label>
                <label class="flex flex-col text-gray-600">
                    <span>Затраты на маркетинг:</span>
                    <input type="number" v-model="marketingCosts"
                        class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
                    <span class="text-sm text-gray-500">Сумма затрат на привлечение клиентов.</span>
                </label>
                <label class="flex flex-col text-gray-600">
                    <span>Средний срок жизни клиента (мес.):</span>
                    <input type="number" v-model="customerLifetime"
                        class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
                    <span class="text-sm text-gray-500">Средний период времени, в течение которого клиент остается с
                        компанией.</span>
                </label>
                <label class="flex flex-col text-gray-600">
                    <span>Затраты на привлечение одного клиента:</span>
                    <input type="number" v-model="customerAcquisition"
                        class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
                    <span class="text-sm text-gray-500">Сумма расходов на привлечение одного клиента.</span>
                </label>
                <label class="flex flex-col text-gray-600">
                    <span>Коэффициент конверсии (0-1):</span>
                    <input type="number" v-model="conversionRate" step="0.01"
                        class="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
                    <span class="text-sm text-gray-500">Процент посетителей сайта, которые становятся клиентами.</span>
                </label>
            </div>
        </div>

        <!-- Рассчитанные значения -->
        <div class="mt-6 space-y-2">
            <h3 class="text-lg font-semibold text-gray-700">Рассчитанные показатели</h3>
            <p class="flex justify-between font-semibold bg-gray-100 p-2 rounded-md shadow-sm text-gray-600">
                LTV (Lifetime Value): <span>{{ ltv.toFixed(2) }} ₽</span>
            </p>
            <p class="text-sm text-gray-500">LTV (Lifetime Value) — это общая сумма дохода, который компания может
                ожидать от одного клиента за весь срок его взаимодействия с компанией.</p>

            <p class="flex justify-between font-semibold bg-gray-100 p-2 rounded-md shadow-sm text-gray-600">
                CAC (Customer Acquisition Cost): <span>{{ cac.toFixed(2) }} ₽</span>
            </p>
            <p class="text-sm text-gray-500">CAC (Стоимость привлечения клиента) — это средняя стоимость маркетинговых и
                рекламных затрат для привлечения одного нового клиента.</p>

            <p class="flex justify-between font-semibold bg-gray-100 p-2 rounded-md shadow-sm text-gray-600">
                LTV/CAC: <span>{{ ltvToCacRatio }} </span>
            </p>
            <p class="text-sm text-gray-500">LTV/CAC — это соотношение между LTV и CAC, которое помогает понять, сколько
                дохода генерируется с каждого вложенного рубля в привлечение клиента.</p>

            <p class="flex justify-between font-semibold bg-gray-100 p-2 rounded-md shadow-sm text-gray-600">
                Коэффициент конверсии: <span>{{ conversionRatio }}%</span>
            </p>
            <p class="text-sm text-gray-500">Коэффициент конверсии — это процент посетителей или потенциальных клиентов,
                которые становятся платящими пользователями или совершают целевые действия.</p>

            <p class="flex justify-between font-semibold bg-gray-100 p-2 rounded-md shadow-sm text-gray-600">
                MRR (Ежемесячный повторяющийся доход): <span>{{ monthlyRecurringRevenue.toFixed(2) }} ₽</span>
            </p>
            <p class="text-sm text-gray-500">MRR (Monthly Recurring Revenue) — это ежемесячный доход, который компания
                получает от подписок или регулярных платежей от клиентов.</p>
        </div>


        <!-- Финансовые показатели -->
        <div class="mt-6 space-y-2">
            <h3 class="text-lg font-semibold text-gray-700">Финансовые данные</h3>
            <p class="flex justify-between font-semibold bg-gray-100 p-2 rounded-md shadow-sm text-gray-600">
                Маржа: <span>{{ margin.toFixed(2) }}%</span>
            </p>
            <p class="flex justify-between font-semibold bg-gray-100 p-2 rounded-md shadow-sm text-gray-600">
                Операционная маржа: <span>{{ operationalMargin.toFixed(2) }}%</span>
            </p>
            <p class="flex justify-between font-semibold bg-gray-100 p-2 rounded-md shadow-sm text-gray-600">
                Чистая прибыль: <span>{{ profitability.toFixed(2) }} ₽</span>
            </p>
            <p class="flex justify-between font-semibold bg-gray-100 p-2 rounded-md shadow-sm text-gray-600">
                ROI: <span>{{ roi.toFixed(2) }}%</span>
            </p>
            <p class="flex justify-between font-semibold bg-gray-100 p-2 rounded-md shadow-sm text-gray-600">
                NPV: <span>{{ npv.toFixed(2) }} ₽</span>
            </p>
            <p class="flex justify-between font-semibold bg-gray-100 p-2 rounded-md shadow-sm text-gray-600">
                IRR: <span>{{ irr.toFixed(2) }}%</span>
            </p>
            <p class="flex justify-between font-semibold bg-gray-100 p-2 rounded-md shadow-sm text-gray-600">
                Срок окупаемости: <span>{{ paybackPeriod }}</span>
            </p>
        </div>
    </div>
</template>
