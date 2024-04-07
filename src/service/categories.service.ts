import ApiService from "./api.service";

class CategoriesService {

  async getGenre() {
    return await ApiService.get('/genre');
  }

  async getAgeRating() {
    return await ApiService.get('/age-rating');
  }

  async getPublisher() {
    return await ApiService.get('/publisher');
  }

  async createPublisher(name: string, description: string) {
    return await ApiService.post('/publisher', {name, description})
  }


}

export default new CategoriesService();
