export function confirmPasswordValidator(p,c) {
    if (!c) return "Password can't be empty."
    else if (p != c) return 'Passwords don\'t match.'
    return ''
  }
  
  