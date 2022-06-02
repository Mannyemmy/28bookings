import api from "../Api";

// "subject": "string",
//   "body": "string",
//   "user_id": 14,
//   "lendee_id": 14,
//   "item_id": 23,
//   "cost": 2000,
//   "duration": 14,
//   "from_date": "2022-05-29T10:08:44.306Z",
//   "to_date": "2022-05-30T10:08:44.306Z"
export const createRental = async (
 data
) => {
    try {
      const response = await api.post('/rental', data)
      return response;
    } catch (error) {
        console.error(error.message);
    }
    
};
