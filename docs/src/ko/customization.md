# 커스터마이징

`@suis-ui/kit`은 vanilla-extract theme contract를 사용합니다. Public theme API는 `@suis-ui/kit`에서 export됩니다.

## ThemeProvider

`ThemeProvider`는 기본 `token`, `component`, light `vars` 테마 클래스를 `document.body`에 마운트합니다.

```tsx
import '@suis-ui/kit/style.css';
import { ThemeProvider } from '@suis-ui/kit';

export const App = () => (
  <ThemeProvider>
    {/* app */}
  </ThemeProvider>
);
```

Kit 컴포넌트를 렌더링하기 전에 `ThemeProvider`를 사용하세요.

## 런타임 테마 선택

`useTheme`은 현재 테마 accessor와 setter를 반환합니다.

```tsx
import { useTheme } from '@suis-ui/kit';

const ThemeSwitcher = () => {
  const [, setTheme] = useTheme();

  const useCustomTheme = () => {
    setTheme('my-theme-class');
  };

  return <button onClick={useCustomTheme}>Use custom theme</button>;
};
```

Setter는 다음 값을 받습니다.

- class name 문자열
- `createTheme` 결과
- 기본 테마 클래스만 활성 상태로 남기는 `null`

## createTheme

`createTheme`은 부분적인 `component`, `vars`, `token` override를 받고 `[className, mount]`를 반환합니다.

```tsx
import { createTheme, useTheme } from '@suis-ui/kit';

const theme = createTheme({
  vars: {
    color: {
      primary: {
        main: '#2563eb',
      },
    },
  },
});

const ThemeSwitcher = () => {
  const [, setTheme] = useTheme();

  return (
    <button onClick={() => setTheme(theme)}>
      Use generated theme
    </button>
  );
};
```

생성된 테마는 `<style>` 요소를 마운트하고 생성된 class를 `document.body`에 추가합니다. Cleanup은 둘 다 제거합니다.

## 테마 Layer

Export된 contract는 scope와 우선순위에 따라 사용하세요.

| 우선순위 | Export | Scope |
| --- | --- | --- |
| 1 | `component` | Button, CheckBox, Popup, Select, Input, Item, Tooltip에 대한 컴포넌트별 값 |
| 2 | `vars` | Color, font, shadow, space, line size, z-index, motion 같은 semantic alias |
| 3 | `token` | Color palette, size, text size, z-index, motion 같은 raw design value |

SUIS 컴포넌트의 모양을 바꿀 때는 `component`를 선호하세요. 애플리케이션 수준 커스터마이징에는 semantic `vars`를 선호하세요. 필요한 값을 `component`나 `vars`로 표현할 수 없을 때만 raw `token` 값을 사용하세요.

## 컴포넌트 커스터마이징

Kit 컴포넌트는 여러 primitive 컴포넌트를 하나의 스타일 API로 감싸는 경우가 많습니다. 예를 들어 primitive Select는 `Select.Trigger`, `Select.Value`, `Select.Content`, `Select.Item`으로 조합하지만, kit Select는 하나의 `Select` 컴포넌트를 노출합니다.

Kit이 내부 구조를 관리할 때는 primitive 구조를 다시 만드는 대신 `*Props`와 `render*` props로 내부 part를 커스터마이징하세요.

- `*Props`는 `itemProps`처럼 내부 part에 props를 전달합니다.
- `render*`는 `renderItem`처럼 내부 part를 교체합니다.

해당 컴포넌트 문서에 명시된 props만 사용하세요. `contentProps`나 `renderContent` 같은 패턴 이름은 convention을 설명하지만, 해당 컴포넌트가 명시적으로 문서화한 경우에만 사용할 수 있습니다.
