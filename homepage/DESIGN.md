---
name: VIRA-1 Precision Interface
colors:
  surface: '#0e1416'
  surface-dim: '#0e1416'
  surface-bright: '#343a3c'
  surface-container-lowest: '#090f11'
  surface-container-low: '#161d1e'
  surface-container: '#1a2122'
  surface-container-high: '#242b2d'
  surface-container-highest: '#2f3638'
  on-surface: '#dde4e5'
  on-surface-variant: '#bbc9cd'
  inverse-surface: '#dde4e5'
  inverse-on-surface: '#2b3233'
  outline: '#859397'
  outline-variant: '#3c494c'
  surface-tint: '#2fd9f4'
  primary: '#8aebff'
  on-primary: '#00363e'
  primary-container: '#22d3ee'
  on-primary-container: '#005763'
  inverse-primary: '#006877'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffd6a7'
  on-tertiary: '#472a00'
  tertiary-container: '#ffb147'
  on-tertiary-container: '#704500'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a2eeff'
  primary-fixed-dim: '#2fd9f4'
  on-primary-fixed: '#001f25'
  on-primary-fixed-variant: '#004e5a'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0e1416'
  on-background: '#dde4e5'
  surface-variant: '#2f3638'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
  data-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.2'
spacing:
  section-gap: 96px
  container-max: 1200px
  gutter: 24px
  grid-unit: 8px
  card-padding: 24px
---

## Brand & Style
The design system for the VIRA-1 interface is rooted in **Industrial Precision** and **Technical Modernism**. It reflects the environment of semiconductor backend manufacturing—clean, controlled, and highly engineered. The aesthetic draws from high-end measuring equipment, utilizing a dark-mode foundation to reduce eye strain for operators while highlighting critical data points with luminescent accents.

The style is a hybrid of **Minimalism** and **Technical/Futuristic** motifs. It avoids decorative clutter in favor of functional micro-grids, thin polygon outlines reminiscent of silicon wafer structures, and data-dense visualizations. The intent is to evoke a sense of absolute accuracy, speed, and AI-driven reliability.

## Colors
The palette is optimized for a high-contrast, low-light manufacturing environment. 

- **Foundation:** The core background (`#0B0F14`) provides a deep canvas, with cards (`#141A22`) and borders (`#253040`) creating a clear structural hierarchy without excessive brightness.
- **Accents:** Cyan (`#22D3EE`) is reserved for active states, primary actions, and branding elements.
- **Status Indicators:** A semantic trio is used for inspection results: 
  - **PASS:** Emerald (`#10B981`) indicates optimal yield.
  - **REVIEW:** Amber (`#F59E0B`) signals manual intervention required.
  - **REJECT:** Rose (`#EF4444`) indicates critical failure.
- **Typography:** Primary text uses a high-legibility silver-white (`#E6EDF3`), while metadata uses a muted slate (`#8B98A5`).

## Typography
This design system utilizes **Hanken Grotesk** (as a high-quality alternative to Pretendard) for general UI and prose, providing a sharp, contemporary sans-serif feel. All technical data, coordinates, and metrics must use **JetBrains Mono** to ensure `tabular-nums` alignment, which is critical for comparing inspection values vertically.

- **Headlines:** Should be tight and impactful, using slight negative letter-spacing on larger sizes.
- **Data Tables:** Always use the `label-mono` or `data-sm` roles to ensure numbers do not "jump" during real-time updates.
- **Mobile Scaling:** For screens under 768px, `display-lg` should scale down to 32px to maintain viewport integrity.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for the main content area to mimic the precision of a technical datasheet.

- **Desktop:** A 12-column grid with a maximum width of 1200px. Major sections are separated by a consistent 96px vertical gap.
- **Micro-Layout:** All spacing (padding, margins) must be multiples of the 8px `grid-unit`.
- **Wafer Grids:** Backgrounds should occasionally feature a subtle 32px CSS grid pattern in `#253040` (1px weight) to reinforce the semiconductor theme.
- **Responsiveness:** On tablet and mobile, section spacing reduces to 64px and 48px respectively, with margins narrowing to 16px.

## Elevation & Depth
In this design system, depth is achieved through **Tonal Layers** and **Low-Contrast Outlines** rather than traditional drop shadows.

- **Base Layer:** `#0B0F14` (The manufacturing floor).
- **Surface Layer:** `#141A22` cards with a 1px solid border of `#253040`.
- **Active State:** Elements in focus or active status receive a secondary "glow" border of `#22D3EE` at 0.5 opacity or a thin polygon overlay.
- **Technical Detail:** Use "Micro-grids" (1px lines) to divide content within cards, maintaining a flat but structured technical aesthetic. Avoid soft blurs; keep all transitions sharp and immediate.

## Shapes
The shape language is **Sharp (0px)**. To reflect the mechanical and crystalline nature of silicon wafers and precision machinery, rounded corners are avoided. 

- **Containers:** All cards, buttons, and input fields must have 90-degree angles.
- **Decorative Accents:** Use 45-degree "clipped corners" for status tags or primary buttons to reinforce the engineered, high-tech look.
- **Icons:** Use thin-stroke (1.5px) geometric icons with sharp joins.

## Components
- **Buttons:** Primary buttons are solid `#22D3EE` with black text. Secondary buttons are outlined with 1px `#253040` and feature a hover state that lightens the border to `#22D3EE`.
- **Status Chips:** Rectangular tags with a 1px border. For a "PASS" result, use a 10% opacity green background with a solid `#10B981` left-edge accent (2px).
- **Inspection Cards:** Must include a "Wafer Map" thumbnail or a micro-grid visualization in the header. Use `label-mono` for all serial numbers and timestamps.
- **Input Fields:** Dark background (`#0B0F14`), 1px border (`#253040`). Focus state changes border to `#22D3EE` with no outer glow.
- **Data Visualization:** Line charts should use a 1.5px stroke width. Areas under the line should use a very subtle gradient (Cyan to Transparent at 5% opacity). Grid lines within charts must match `#253040`.
- **Checkboxes:** Square, sharp-edged. When checked, the fill is `#22D3EE` with a black checkmark.