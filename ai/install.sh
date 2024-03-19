#! /bin/sh

function show_menu() {
	echo "======== Menú ========"
	echo "1. Crear ollama NVIDIA"
	echo "2. Crear ollama CPU"
  echo "3. Desinstalar ollama NVIDIA"
  echo "4. Desinstalar ollama CPU"
	echo "======================"
}

show_menu

read -p "Ingrese que imagen desea instalar: " -n 1 option_input

case $option_input in
1)
	docker compose -f ./compose-gpu.yml up -d --build
	;;

2)
	docker compose -f ./compose-cpu.yml up -d --build
	;;

3)
  echo "Uninstalling ollama NVIDIA..."
  docker compose -f ./compose-gpu.yml down --rmi local
  ;;

4)
  echo "Uninstalling ollama CPU..."
  docker compose -f ./compose-gpu.yml down --rmi local
  ;;

*) echo "Opción no válida, elija entre las opciones disponibles." ;;
esac

if [ "$option_input" -eq 1 ] || [ "$option_input" -eq 2 ]; then
  # pip install python-docx PyPDF2
  # python3 /root/IDSA_bot/docs/add_data.py
  docker cp ./Modelfile ollama:/Modelfile
  docker cp ./Modelfile ollama:/Modelfile
  docker exec -it ollama ollama create IDSAmodel -f ./Modelfile
  docker exec -it -d ollama ollama run IDSAmodel

  echo "Instalación completa!"

else
  echo "Desinstalación completa!"
fi
