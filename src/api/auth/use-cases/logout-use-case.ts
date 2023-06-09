import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { isEqual } from 'date-fns';

import { UserRepository } from '../../user/user.repository';
import { DeviceRepository } from '../../device/device.repository';

export class LogoutCommand {
  constructor(
    public userId: string,
    public deviceId: string,
    public deviceIat: string,
  ) {}
}

@CommandHandler(LogoutCommand)
export class LogoutUseCase implements ICommandHandler<LogoutCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly deviceRepository: DeviceRepository,
  ) {}
  // Logout пользователя
  async execute(command: LogoutCommand): Promise<{ statusCode: HttpStatus }> {
    const { userId, deviceId, deviceIat } = command;
    // Ищем пользователя по его идентификатору
    const user = await this.userRepository.findUserById(userId);
    // Ищем устройство пользователя по его идентификатору
    const device = await this.deviceRepository.findDeviceById(deviceId);
    // Если пользователь не найден, возвращаем ошибку 401
    if (!user || !device) {
      return { statusCode: HttpStatus.UNAUTHORIZED };
    }
    // Если даты создания устройства не совпадают, возвращаем ошибку 401
    if (!isEqual(new Date(deviceIat), new Date(device.lastActiveDate))) {
      return { statusCode: HttpStatus.UNAUTHORIZED };
    }
    // Очищаем refreshToken пользователя
    await this.userRepository.updateRefreshToken(user.id, '');
    // Удаляем устройство
    await this.deviceRepository.deleteDeviceById(device.deviceId, user.id);
    // Возвращаем статус 204
    return { statusCode: HttpStatus.NO_CONTENT };
  }
}
