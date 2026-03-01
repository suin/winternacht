#!/usr/bin/env bash
# Winternacht tmux theme — TPM entry point
# https://github.com/suin/winternacht

CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ------------------------------------
# Winternacht Color Palette
# ------------------------------------
# All colors are exposed as @winternacht_color_* user options.
# External scripts can read them via: tmux show -gqv @winternacht_color_*

# Neutral
tmux set -g @winternacht_color_bg        "#1A1917"   # neutral-950
tmux set -g @winternacht_color_bg_surface "#242320"   # neutral-900
tmux set -g @winternacht_color_bg_elevated "#3A3835"  # neutral-800
tmux set -g @winternacht_color_border     "#504D48"   # neutral-700
tmux set -g @winternacht_color_muted      "#6B6862"   # neutral-600
tmux set -g @winternacht_color_subtle     "#7A7672"   # neutral-500
tmux set -g @winternacht_color_text       "#D6D3CE"   # dark text

# Accent
tmux set -g @winternacht_color_accent      "#8CC3CB"  # accent-200 (dark primary)
tmux set -g @winternacht_color_accent_deep "#5F9EA8"  # accent-300

# Scale colors (dark lightened)
tmux set -g @winternacht_color_lavender "#8A7EB0"  # lavender-300 (session icon)
tmux set -g @winternacht_color_sage     "#A0C496"  # sage dark lightened
tmux set -g @winternacht_color_sand     "#D4B87A"  # sand dark lightened
tmux set -g @winternacht_color_clay     "#D4A0A0"  # clay dark lightened
tmux set -g @winternacht_color_slate    "#8DAFD4"  # slate dark lightened
tmux set -g @winternacht_color_rose     "#D0A0AA"  # rose dark lightened
tmux set -g @winternacht_color_mint     "#8DC0A8"  # mint dark lightened
tmux set -g @winternacht_color_copper   "#D0B080"  # copper dark lightened

# Load theme configuration
tmux source-file "$CURRENT_DIR/src/winternacht.conf"
