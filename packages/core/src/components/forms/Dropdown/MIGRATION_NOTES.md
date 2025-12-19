# Dropdown Migration Notes

## ✅ O que foi mudado

### 1. Props API
- **ANTES**: `position?: "top" | "bottom"`
- **DEPOIS**: `placement?: "top-start" | "top-end" | "bottom-start" | "bottom-end"`
- **NOVO**: `offset?: number` (default: 4)

### 2. Hook
- **ANTES**: `useContextMenu` from `@components/hooks`
- **DEPOIS**: `useContextMenuPosition` from `@components/overlay/ContextMenu`

### 3. Posicionamento
- Agora usa sistema compartilhado do ContextMenu
- Detecção de colisão automática
- SafeArea support
- Reativo a mudanças de dimensão
- `matchTriggerWidth: true` aplicado automaticamente

### 4. Comportamento
- Posicionamento mais inteligente
- Ajuste automático quando não há espaço
- Melhor suporte a telas pequenas

## 🔄 Breaking Changes

### placement prop
```diff
- position="top"
+ placement="top-start"

- position="bottom"  
+ placement="bottom-start"
```

### Imports (se usar hooks diretamente)
```diff
- import { useContextMenu } from '@components/hooks';
+ import { useContextMenuPosition } from '@components/overlay/ContextMenu';
```

## ✨ Novos Recursos

1. **4 variações de placement** (vs 2 anteriores)
2. **Offset customizável** via prop
3. **Detecção de colisão** automática
4. **Posicionamento inteligente** compartilhado com ContextMenu

## 🚀 Migração

Para usuários do Dropdown: **nenhuma mudança necessária** se usar apenas props padrão.

Se você usava `position="top"` ou `position="bottom"`:
- Substitua por `placement="top-start"` ou `placement="bottom-start"`
- Ou simplesmente remova (default é `"bottom-start"`)

## 📚 Documentação

Consulte `ContextMenu/API_COMPATIBILITY.md` para detalhes completos.
