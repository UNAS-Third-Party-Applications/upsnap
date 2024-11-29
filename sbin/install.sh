#!/bin/bash

if [[ $1 == */ ]]; then
  INSTALL_PATH=${1%?}
else
  INSTALL_PATH=$1
fi

if [[ $2 == */ ]]; then
  CONFIG_PATH=${2%?}
else
  CONFIG_PATH=$2
fi

PORT=$3

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

if [ ! -f "$INSTALL_PATH/upsnap" ]; then
  echo -e "\r\n${RED_COLOR}出错了${RES}，当前系统未安装 UpSnap\r\n"
  exit 1
fi

# 创建 systemd
cat >/etc/systemd/system/upsnap.service <<EOF
[Unit]
Description=UNAS UpSnap service
Wants=network.target
After=network.target network.service

[Service]
Type=simple
WorkingDirectory=$CONFIG_PATH
Environment=XDG_CONFIG_HOME="$CONFIG_PATH"
ExecStart=$INSTALL_PATH/upsnap serve --dir=$CONFIG_PATH --http=0.0.0.0:$PORT
KillMode=process

[Install]
WantedBy=multi-user.target

Environment=XDG_CONFIG_HOME="$CONFIG_PATH"
EOF

# 添加开机启动
systemctl daemon-reload
systemctl enable upsnap >/dev/null 2>&1
# 启动服务
systemctl start upsnap >/dev/null 2>&1

