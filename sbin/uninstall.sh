#!/bin/bash

RED_COLOR='\e[1;31m'
GREEN_COLOR='\e[1;32m'
YELLOW_COLOR='\e[1;33m'
BLUE_COLOR='\e[1;34m'
PINK_COLOR='\e[1;35m'
SHAN='\e[1;33;5m'
RES='\e[0m'
clear

if [ "$(id -u)" != "0" ]; then
  echo -e "\r\n${RED_COLOR}出错了，请使用 root 权限重试！${RES}\r\n" 1>&2
  exit 1
fi

echo -e "\r\n${GREEN_COLOR}卸载 UpSnap ...${RES}\r\n"
echo -e "${GREEN_COLOR}停止进程${RES}"
systemctl disable upsnap >/dev/null 2>&1
systemctl stop upsnap >/dev/null 2>&1
echo -e "${GREEN_COLOR}清除残留文件${RES}"
rm -rf /etc/systemd/system/upsnap.service
# 兼容之前的版本
rm -f /lib/systemd/system/upsnap.service
systemctl daemon-reload
echo -e "\r\n${GREEN_COLOR}UpSnap 已在系统中移除！${RES}\r\n"

