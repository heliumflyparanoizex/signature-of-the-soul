def reduce_to_single_digit(number):
    """
    Reduce un número a un solo dígito (1-9) mediante la suma repetida de sus dígitos.
    Los números maestros 11, 22, 33 se reducen a 2, 4, 6 respectivamente para la firma final.
    """
    if not isinstance(number, int):
        raise ValueError("Input must be an integer.")

    # Mantener números maestros si son el resultado final de la suma inicial, pero para la firma final se reducen
    # En este contexto, siempre reducimos a un solo dígito para la firma final.
    while number > 9:
        number = sum(int(digit) for digit in str(number))
    return number

def calculate_name_number(name):
    """
    Calcula el número numerológico de un nombre o apellido.
    """
    if not isinstance(name, str):
        raise ValueError("Input must be a string.")

    name = name.upper().replace('Ñ', 'N') # Convertir a mayúsculas y tratar Ñ como N
    # Mapeo Pitagórico de letras a números
    letter_values = {
        'A': 1, 'J': 1, 'S': 1,
        'B': 2, 'K': 2, 'T': 2,
        'C': 3, 'L': 3, 'U': 3,
        'D': 4, 'M': 4, 'V': 4,
        'E': 5, 'N': 5, 'W': 5,
        'F': 6, 'O': 6, 'X': 6,
        'G': 7, 'P': 7, 'Y': 7,
        'H': 8, 'Q': 8, 'Z': 8,
        'I': 9, 'R': 9
    }

    total_sum = 0
    for char in name:
        if char in letter_values:
            total_sum += letter_values[char]
        # Ignorar caracteres no alfabéticos o no mapeados

    return reduce_to_single_digit(total_sum)

def calculate_life_path_number(day, month, year):
    """
    Calcula el número de ruta de vida a partir de la fecha de nacimiento.
    Los números maestros 11, 22, 33 se mantienen si son el resultado final de la suma del día, mes, año.
    """
    if not all(isinstance(arg, int) for arg in [day, month, year]):
        raise ValueError("Day, month, and year must be integers.")

    # Reducir día, mes y año individualmente
    reduced_day = day
    while reduced_day > 9 and reduced_day not in [11, 22]: # Mantener 11, 22 para día si aplica
        reduced_day = sum(int(digit) for digit in str(reduced_day))

    reduced_month = month
    while reduced_month > 9 and reduced_month not in [11, 22]: # Mantener 11, 22 para mes si aplica
        reduced_month = sum(int(digit) for digit in str(reduced_month))

    reduced_year = year
    while reduced_year > 9 and reduced_year not in [11, 22]: # Mantener 11, 22 para año si aplica
        reduced_year = sum(int(digit) for digit in str(reduced_year))

    # Sumar los componentes reducidos
    total_sum = reduced_day + reduced_month + reduced_year

    # Reducir la suma final, manteniendo números maestros si son el resultado final
    while total_sum > 9 and total_sum not in [11, 22, 33]:
        total_sum = sum(int(digit) for digit in str(total_sum))

    return total_sum

def calculate_vibrational_signature(first_name, last_name, day, month, year):
    """
    Calcula la firma vibracional principal combinando el número del nombre, apellido y ruta de vida.
    Para la firma final, todos los números se reducen a un solo dígito (1-9).
    """
    name_number = calculate_name_number(first_name)
    surname_number = calculate_name_number(last_name)
    life_path_number = calculate_life_path_number(day, month, year)

    # Combinar los números para la firma vibracional principal
    # Se propone una suma simple y reducción a un solo dígito para la firma principal
    total_signature_sum = name_number + surname_number + life_path_number
    final_signature = reduce_to_single_digit(total_signature_sum)

    return {
        "name_number": name_number,
        "surname_number": surname_number,
        "life_path_number": life_path_number,
        "final_vibrational_signature": final_signature
    }

# Ejemplo de uso:
print(calculate_vibrational_signature("Ana", "Torres", 23, 10, 1990))
print(calculate_vibrational_signature("Jesús", "Hernández", 15, 3, 1985))

