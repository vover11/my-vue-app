import{d as N,f as R,m as P,p as F,c as o,o as e,a as s,q as _,n as y,F as i,g as b,j as C,t as c,v as w,e as d}from"./index-BJ4_y8OK.js";const q={class:"max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg shadow-lg m-4"},I={class:"flex border-b border-gray-200 mb-6"},U={key:0,class:"space-y-6"},O={class:"space-y-4"},$={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},B={key:0,class:"flex flex-col text-gray-600"},D=["onUpdate:modelValue","step"],j={class:"mt-4"},z={class:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"},E={class:"text-gray-700 text-sm"},S=["onUpdate:modelValue"],G={class:"space-y-4"},H={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},J={class:"flex flex-col"},K={class:"font-semibold text-gray-600"},Q={class:"text-xs text-gray-500 mb-2"},W={class:"text-blue-600 font-bold mt-1"},X={key:1,class:"space-y-6"},Y={class:"space-y-4"},Z={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},k={class:"flex flex-col text-gray-600"},tt={class:"font-medium"},st={class:"text-xs text-gray-500 mb-1"},ot=["onUpdate:modelValue","step","min","max"],et={class:"space-y-4"},lt={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},at={class:"font-semibold text-gray-600"},it={class:"text-xs text-gray-500 mb-2"},nt={class:"text-blue-600 font-bold mt-1"},dt=N({__name:"Metrics",setup(rt){const m=R("financial"),n=R({revenue:0,cost:0,operationalCost:0,initialInvestment:0,discountRate:.1,periods:1,cashFlows:[0]}),x=R({mrr:0,numberOfCustomers:0,marketingCosts:0,customerLifetime:12,customerAcquisition:0,conversionRate:.05});P(()=>n.value.periods,r=>{r>n.value.cashFlows.length?n.value.cashFlows=[...n.value.cashFlows,...Array(r-n.value.cashFlows.length).fill(0)]:r<n.value.cashFlows.length&&(n.value.cashFlows=n.value.cashFlows.slice(0,r))});const M=F(()=>{const{revenue:r,cost:a,operationalCost:l,initialInvestment:t,discountRate:u,cashFlows:v}=n.value,f=r-a,g=f-l,V=v.reduce((h,p,L)=>h+p/Math.pow(1+u,L+1),-t),T=(()=>{let h=-t;for(let p=0;p<v.length;p++)if(h+=v[p],h>=0)return p+1;return null})();return{margin:r?f/r*100:0,operationalMargin:r?(r-l)/r*100:0,profitability:g-t,roi:t?(g-t)/t*100:0,npv:V,paybackPeriod:T}}),A=F(()=>{const{mrr:r,numberOfCustomers:a,marketingCosts:l,customerLifetime:t,customerAcquisition:u,conversionRate:v}=x.value,f=r*t,g=a>0?l/a:u;return{ltv:f,cac:g,ltvToCacRatio:g>0?(f/g).toFixed(2):"N/A",conversionRatio:(v*100).toFixed(2),monthlyRecurringRevenue:a*r}});return(r,a)=>(e(),o("div",q,[a[7]||(a[7]=s("h2",{class:"text-2xl font-bold text-center mb-6 text-gray-700"},"Калькулятор бизнес-метрик",-1)),s("div",I,[s("button",{onClick:a[0]||(a[0]=l=>m.value="financial"),class:y([{"border-b-2 border-blue-500 text-blue-600":m.value==="financial","text-gray-500 hover:text-gray-700":m.value!=="financial"},"py-2 px-4 font-medium text-sm focus:outline-none"])}," Финансовые данные ",2),s("button",{onClick:a[1]||(a[1]=l=>m.value="product"),class:y([{"border-b-2 border-blue-500 text-blue-600":m.value==="product","text-gray-500 hover:text-gray-700":m.value!=="product"},"py-2 px-4 font-medium text-sm focus:outline-none"])}," Метрики продукта ",2)]),m.value==="financial"?(e(),o("div",U,[s("div",O,[a[3]||(a[3]=s("h3",{class:"text-lg font-semibold text-gray-700"},"Введите финансовые данные",-1)),s("div",$,[(e(!0),o(i,null,b(n.value,(l,t)=>(e(),o("div",{key:t},[t!=="cashFlows"?(e(),o("label",B,[s("span",null,c(t==="revenue"?"Выручка":t==="cost"?"Себестоимость":t==="operationalCost"?"Операционные затраты":t==="initialInvestment"?"Начальные инвестиции":t==="discountRate"?"Ставка дисконтирования":t==="periods"?"Количество периодов":t)+":",1),C(s("input",{type:"number","onUpdate:modelValue":u=>n.value[t]=u,class:"w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400",step:t==="discountRate"?"0.01":"1"},null,8,D),[[w,n.value[t]]])])):_("",!0)]))),128))]),s("div",j,[a[2]||(a[2]=s("h4",{class:"font-semibold text-gray-700 mb-2"},"Денежные потоки по периодам:",-1)),s("div",z,[(e(!0),o(i,null,b(n.value.cashFlows,(l,t)=>(e(),o("div",{key:t,class:"flex flex-col"},[s("label",E,"Период "+c(t+1)+":",1),C(s("input",{type:"number","onUpdate:modelValue":u=>n.value.cashFlows[t]=u,class:"p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-gray-700",step:"1"},null,8,S),[[w,n.value.cashFlows[t]]])]))),128))])])]),s("div",G,[a[4]||(a[4]=s("h3",{class:"text-lg font-semibold text-gray-700"},"Финансовые показатели",-1)),s("div",H,[(e(!0),o(i,null,b(M.value,(l,t)=>(e(),o("div",{key:t,class:"bg-white p-4 rounded-lg shadow"},[s("div",J,[s("p",K,c(t==="margin"?"Маржа":t==="operationalMargin"?"Операционная маржа":t==="profitability"?"Чистая прибыль":t==="roi"?"ROI":t==="npv"?"NPV":t==="paybackPeriod"?"Срок окупаемости":t)+": ",1),s("p",Q,[t==="margin"?(e(),o(i,{key:0},[d(" Процент прибыли от выручки: (Выручка - Себестоимость) / Выручка × 100% ")],64)):t==="operationalMargin"?(e(),o(i,{key:1},[d(" Прибыльность после операционных затрат: (Выручка - Операционные затраты) / Выручка × 100% ")],64)):t==="profitability"?(e(),o(i,{key:2},[d(" Фактическая прибыль после всех затрат и инвестиций: Чистая прибыль - Инвестиции ")],64)):t==="roi"?(e(),o(i,{key:3},[d(" Возврат на инвестиции: (Чистая прибыль - Инвестиции) / Инвестиции × 100% ")],64)):t==="npv"?(e(),o(i,{key:4},[d(" Чистая приведённая стоимость: показывает прибыльность проекта с учётом стоимости денег во времени ")],64)):t==="paybackPeriod"?(e(),o(i,{key:5},[d(" Время, за которое проект окупит начальные инвестиции (в годах) ")],64)):_("",!0)]),s("p",W,[t==="paybackPeriod"?(e(),o(i,{key:0},[d(c(l!==null?`${l} лет`:"Не окупается"),1)],64)):t==="margin"||t==="operationalMargin"||t==="roi"?(e(),o(i,{key:1},[d(c(l!==null?`${l.toFixed(2)}%`:"N/A"),1)],64)):(e(),o(i,{key:2},[d(c(l!==null?l.toFixed(2):"N/A"),1)],64))])])]))),128))])])])):_("",!0),m.value==="product"?(e(),o("div",X,[s("div",Y,[a[5]||(a[5]=s("h3",{class:"text-lg font-semibold text-gray-700"},"Введите метрики продукта",-1)),s("div",Z,[(e(!0),o(i,null,b(x.value,(l,t)=>(e(),o("div",{key:t,class:"space-y-1"},[s("label",k,[s("span",tt,c(t==="mrr"?"MRR (ежемесячный доход)":t==="numberOfCustomers"?"Количество клиентов":t==="marketingCosts"?"Затраты на маркетинг":t==="customerLifetime"?"Срок жизни клиента (мес.)":t==="customerAcquisition"?"Затраты на привлечение клиента":"Коэффициент конверсии"),1),s("span",st,c(t==="mrr"?"Средний ежемесячный регулярный доход от подписки":t==="numberOfCustomers"?"Общее количество активных клиентов":t==="marketingCosts"?"Общие расходы на маркетинг за период":t==="customerLifetime"?"Среднее время работы с клиентом (в месяцах)":t==="customerAcquisition"?"Средняя стоимость привлечения одного клиента":"Процент посетителей, становящихся клиентами (от 0 до 1)"),1),C(s("input",{type:"number","onUpdate:modelValue":u=>x.value[t]=u,class:"w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400",step:t==="conversionRate"?"0.01":"1",min:t==="conversionRate"?"0":void 0,max:t==="conversionRate"?"1":void 0},null,8,ot),[[w,x.value[t]]])])]))),128))])]),s("div",et,[a[6]||(a[6]=s("h3",{class:"text-lg font-semibold text-gray-700"},"Рассчитанные показатели",-1)),s("div",lt,[(e(!0),o(i,null,b(A.value,(l,t)=>(e(),o("div",{key:t,class:"bg-white p-4 rounded-lg shadow"},[s("p",at,c(t==="ltv"?"LTV (Lifetime Value)":t==="cac"?"CAC (Customer Acquisition Cost)":t==="ltvToCacRatio"?"LTV/CAC":t==="conversionRatio"?"Коэффициент конверсии":"MRR (Monthly Recurring Revenue)"),1),s("p",it,c(t==="ltv"?"Общая прибыль от клиента за всё время сотрудничества":t==="cac"?"Средние затраты на привлечение одного клиента":t==="ltvToCacRatio"?"Соотношение ценности клиента к затратам на его привлечение":t==="conversionRatio"?"Процент конверсии посетителей в клиентов":"Общий ежемесячный доход от всех клиентов"),1),s("p",nt,[t==="ltvToCacRatio"?(e(),o(i,{key:0},[d(c(l),1)],64)):t==="conversionRatio"?(e(),o(i,{key:1},[d(c(l)+"% ",1)],64)):t==="monthlyRecurringRevenue"?(e(),o(i,{key:2},[d(c(l.toFixed(2)),1)],64)):(e(),o(i,{key:3},[d(c(typeof l=="number"?`${l.toFixed(2)} ₽`:l),1)],64))])]))),128))])])])):_("",!0)]))}});export{dt as default};
