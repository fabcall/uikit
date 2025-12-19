# ContextMenu System

Sistema completo de ContextMenu para React Native com posicionamento inteligente, detecção de colisão e suporte a SafeArea.

## 🚀 Instalação

Os arquivos foram criados automaticamente pelo script de instalação.

## 📦 Dependências Necessárias

```bash
npm install react-native-reanimated react-native-gesture-handler react-native-safe-area-context react-native-unistyles
```

## 🎯 Uso Básico

```tsx
import { ContextMenu } from '@components/overlay/ContextMenu';

function MyComponent() {
  return (
    <ContextMenu
      placement="bottom"
      content={
        <>
          <ContextMenu.Item label="Edit" onPress={() => console.log('Edit')} />
          <ContextMenu.Item label="Share" onPress={() => console.log('Share')} />
          <ContextMenu.Separator />
          <ContextMenu.Item 
            label="Delete" 
            destructive 
            onPress={() => console.log('Delete')} 
          />
        </>
      }
    >
      <Button>Actions</Button>
    </ContextMenu>
  );
}
```

## 📖 Exemplos

### Menu Simples
```tsx
<ContextMenu
  content={
    <>
      <ContextMenu.Item label="Option 1" />
      <ContextMenu.Item label="Option 2" />
      <ContextMenu.Item label="Option 3" />
    </>
  }
>
  <Button>Open Menu</Button>
</ContextMenu>
```

### Com Ícones
```tsx
<ContextMenu
  content={
    <>
      <ContextMenu.Item 
        icon={<EditIcon />} 
        label="Edit" 
      />
      <ContextMenu.Item 
        icon={<DeleteIcon />} 
        label="Delete" 
        destructive 
      />
    </>
  }
>
  <Button>Actions</Button>
</ContextMenu>
```

### Long Press
```tsx
<ContextMenu
  triggerAction="longPress"
  content={<>...</>}
>
  <Card>Long press me</Card>
</ContextMenu>
```

### Tooltip
```tsx
<ContextMenu
  placement="top"
  showArrow
  closeOnSelect={false}
  content={
    <View style={{ padding: 8 }}>
      <Text>Helpful information</Text>
    </View>
  }
>
  <Icon name="info" />
</ContextMenu>
```

## 🎨 Placements Disponíveis

- `top`, `top-start`, `top-end`
- `bottom`, `bottom-start`, `bottom-en
