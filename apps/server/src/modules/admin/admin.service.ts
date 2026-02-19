import { userRepository } from '@/repositories/user.repository';

import { messageService } from '../message/message.service';

class AdminService {
  async listUsers() {
    return userRepository.list();
  }

  async removeMessage(messageId: string) {
    await messageService.moderateDelete(messageId);
  }
}

export const adminService = new AdminService();
