// 代码生成时间: 2025-08-04 09:40:57
import Vue from 'vue';
import axios from 'axios';
import { AxiosInstance } from 'axios';

// 定义接口返回的数据结构
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// 定义API服务类
class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://your-api-base-url.com',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // 获取数据
  public async fetchData<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.get<ApiResponse<T>>(endpoint);
      return response.data;
    } catch (error) {
      // 错误处理
      console.error('API请求错误:', error);
      throw error;
    }
  }

  // 创建数据
  public async createData<T>(endpoint: string, data: T): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.post<ApiResponse<T>>(endpoint, data);
      return response.data;
    } catch (error) {
      // 错误处理
      console.error('API创建请求错误:', error);
      throw error;
    }
  }

  // 更新数据
  public async updateData<T>(endpoint: string, id: number, data: T): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.put<ApiResponse<T>>(endpoint + '/' + id, data);
      return response.data;
    } catch (error) {
      // 错误处理
      console.error('API更新请求错误:', error);
      throw error;
    }
  }

  // 删除数据
  public async deleteData<T>(endpoint: string, id: number): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<ApiResponse<T>>(endpoint + '/' + id);
      return response.data;
    } catch (error) {
      // 错误处理
      console.error('API删除请求错误:', error);
      throw error;
    }
  }
}

// 使用API服务
const apiService = new ApiService();

// 示例：获取数据
apiService.fetchData('items').then(response => {
  console.log('获取数据成功:', response.data);
}).catch(error => {
  console.error('获取数据失败:', error);
});

// 示例：创建数据
apiService.createData('items', { name: 'New Item' }).then(response => {
  console.log('创建数据成功:', response.data);
}).catch(error => {
  console.error('创建数据失败:', error);
});

// 示例：更新数据
apiService.updateData('items', 1, { name: 'Updated Item' }).then(response => {
  console.log('更新数据成功:', response.data);
}).catch(error => {
  console.error('更新数据失败:', error);
});

// 示例：删除数据
apiService.deleteData('items', 1).then(response => {
  console.log('删除数据成功:', response.data);
}).catch(error => {
  console.error('删除数据失败:', error);
});