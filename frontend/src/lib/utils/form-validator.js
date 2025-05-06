/**
 * Fungsi utilitas validasi formulir
 * Setiap fungsi mengembalikan string kosong jika valid atau pesan kesalahan jika tidak valid
 */

// Validasi field tidak kosong
export const validateRequired = (value) => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return "Input ini wajib diisi";
  }
  return "";
};

// Validasi format nama (minimal 2 huruf, hanya huruf dan spasi)
export const validateName = (value) => {
  if (!value.trim()) return "Name is required";
  if (!/^[A-Za-z\s]{2,}$/.test(value)) {
    return "Nama harus minimal 2 karakter dan hanya terdiri dari huruf";
  }
  return "";
};

// Validates email format
export const validateEmail = (value) => {
  if (!value.trim()) return "Email harus diisi";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Format email tidak valid";
  }
  return "";
};

// Validasi password (minimal 8 karakter, harus berisi huruf, angka, dan simbol)
export const validatePassword = (value) => {
  if (!value) return "Password harus diisi";
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  if (!passwordRegex.test(value)) {
    return "Password must be at least 8 characters and include letters, numbers, and symbols";
  }
  return "";
};

// Validasi nomor telepon (hanya angka, 10-15 digit)
export const validatePhone = (value) => {
  if (!value.trim()) return "Phone number is required";
  if (!/^\d{10,15}$/.test(value)) {
    return "Phone number must be 10-15 digits";
  }
  return "";
};

// Validasi format URL
export const validateUrl = (value) => {
  if (!value.trim()) return "";
  try {
    new URL(value);
    return "";
  } catch (e) {
    return "Invalid URL format";
  }
};

// Validasi format tanggal
export const validateDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return "Invalid date format";
  }
  return "";
};

// Validasi panjang minimum
export const validateMinLength = (value, min) => {
  if (!value) return "";
  if (value.length < min) {
    return `Must be at least ${min} characters`;
  }
  return "";
};

// Validasi panjang maksimum
export const validateMaxLength = (value, max) => {
  if (!value) return "";
  if (value.length > max) {
    return `Must be no more than ${max} characters`;
  }
  return "";
};

// Validasi bahwa dua bidang cocok
export const validateMatch = (value, fieldToMatch) => {
  if (value !== fieldToMatch) {
    return "Fields do not match";
  }
  return "";
};

// Validasi format kode pos/zip
export const validatePostalCode = (value) => {
  if (!value.trim()) return "";
  const postalRegex = /^[A-Za-z0-9\s-]{3,10}$/;
  if (!postalRegex.test(value)) {
    return "Invalid postal/zip code format";
  }
  return "";
};

// Validasi nomor kartu kredit menggunakan algoritma Luhn
export const validateCreditCard = (value) => {
  if (!value.trim()) return "";

  // Hapus spasi dan tanda hubung
  const cardNumber = value.replace(/[\s-]/g, "");

  // Periksa apakah hanya berisi digit
  if (!/^\d+$/.test(cardNumber)) {
    return "Credit card can only contain digits";
  }

  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(cardNumber.charAt(i));

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  if (sum % 10 !== 0) {
    return "Invalid credit card number";
  }

  return "";
};

// Validasi terhadap pola regex
export const validatePattern = (value, regex, message) => {
  if (!value) return "";
  if (!regex.test(value)) {
    return message || "Invalid format";
  }
  return "";
};

/**
 * Memvalidasi bidang formulir
 * @param {string} value - Nilai field
 * @param {string} type - Tipe validasi
 * @param {object} options - Opsi validasi tambahan
 * @returns {string} String kosong jika valid, pesan kesalahan jika tidak valid
 */
export const validateField = (value, type, options = {}) => {
  switch (type) {
    case "required":
      return validateRequired(value);
    case "name":
      return validateName(value);
    case "email":
      return validateEmail(value);
    case "password":
      return validatePassword(value);
    case "phone":
      return validatePhone(value);
    case "url":
      return validateUrl(value);
    case "date":
      return validateDate(value);
    case "minLength":
      return validateMinLength(value, options.min);
    case "maxLength":
      return validateMaxLength(value, options.max);
    case "match":
      return validateMatch(value, options.fieldToMatch);
    case "postalCode":
      return validatePostalCode(value);
    case "creditCard":
      return validateCreditCard(value);
    case "pattern":
      return validatePattern(value, options.regex, options.message);
    default:
      return "";
  }
};

/**
 * Memvalidasi seluruh formulir
 * @param {object} values - Nilai-nilai formulir
 * @param {object} validationSchema - Skema pemetaan skema validasi ke tipe validasi
 * @returns {object} Objek dengan kesalahan bidang
 */
export const validateForm = (values, validationSchema) => {
  const errors = {};

  Object.keys(validationSchema).forEach((field) => {
    const value = values[field];
    const validation = validationSchema[field];

    if (typeof validation === "string") {
      // Jenis validasi sederhana
      const error = validateField(value, validation);
      if (error) errors[field] = error;
    } else if (typeof validation === "object") {
      // Validasi dengan opsi
      const error = validateField(value, validation.type, validation.options);
      if (error) errors[field] = error;
    } else if (typeof validation === "function") {
      // Fungsi validasi khusus
      const error = validation(value);
      if (error) errors[field] = error;
    }
  });

  return errors;
};
