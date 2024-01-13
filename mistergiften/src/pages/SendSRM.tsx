import React from "react";

interface ISendCRMProps {
  // data: any; // Тип даних може бути змінений залежно від структури даних, яку ви відправляєте на сервер KeyCRM
}

const SendCRM: React.FC<ISendCRMProps> = ({}) => {
  const token = "ZTg5MWY5NDE4YWRkYTBjZDIzODQ0Mjc4NzRmYmM2MWQxMGY0MmQzZg";

  const sendRequest = async () => {
    const url = ""; // URL для відправлення даних на KeyCRM
    fetch("https://openapi.keycrm.app/v1/order", {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => console.log(data));
  };
  return (
    <div style={{ marginTop: "200px" }}>
      <button onClick={sendRequest}>Відправити на KeyCRM</button>
    </div>
  );
};

export default SendCRM;

//   const data = {
//     source_id: 1,
//     source_uuid: "1",
//     buyer_comment: "I want this sentence to be my `buyer` comment on KeyCRM",
//     manager_id: 1,
//     manager_comment: "Handle till weekend",
//     promocode: "MERRYCHRISTMAS",
//     discount_percent: 11.5,
//     discount_amount: 9.99,
//     shipping_price: 2.5,
//     wrap_price: 3.5,
//     taxes: 2.5,
//     ordered_at: "2021-12-21 14:44:00",
//     buyer: {
//       full_name: "John Doe",
//       email: "john.doe@mail.app",
//       phone: "+1 555-234-1234",
//     },
//     shipping: {
//       delivery_service_id: 1,
//       tracking_code: "530005665555556",
//       shipping_service: "Нова Пошта",
//       shipping_address_city: "Kyiv",
//       shipping_address_country: "Ukraine",
//       shipping_address_region: "Kyivska",
//       shipping_address_zip: "50000",
//       shipping_secondary_line: "string",
//       shipping_receive_point: "Склад #12",
//       recipient_full_name: "Ann Doe",
//       recipient_phone: "+1 555-234-7777",
//       warehouse_ref: "1ec09d2e-e1c2-11e3-8c4a-0050568002cf",
//       shipping_date: "2023-12-21",
//     },
//     marketing: {
//       utm_source: "facebook",
//       utm_medium: "banner",
//       utm_campaign: "sale",
//       utm_term: "landing page",
//       utm_content: "-30%",
//     },
//     products: [
//       {
//         sku: "001-242",
//         price: 124.5,
//         discount_percent: 11.5,
//         discount_amount: 9.99,
//         quantity: 1,
//         unit_type: "кг",
//         name: "Iphone XS max 256gb",
//         comment: "Наклеїти плівку",
//         picture:
//           "https://i.etsystatic.com/22591342/r/il/52142a/2285383547/il_570xN.2285383547_h8a2.jpg",
//         properties: [
//           {
//             name: "Color",
//             value: "Gold",
//           },
//         ],
//       },
//     ],
//     payments: [
//       {
//         payment_method_id: 2,
//         payment_method: "Apple Pay",
//         amount: 123.5,
//         description: "Авансовий платіж",
//         payment_date: "2021-02-21 14:44:00",
//         status: "not_paid",
//       },
//     ],
//     custom_fields: [
//       {
//         uuid: "OR_1037",
//         value: "Лорд",
//       },
//     ],
//   };
