/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

import Gio from "gi://Gio";
import Adw from "gi://Adw";
import Gtk from "gi://Gtk";

import {
    ExtensionPreferences
} from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js";

export default class InhibitionIndicatorPreferences extends ExtensionPreferences {
    async fillPreferencesWindow(window: Adw.PreferencesWindow) {
        const buildable = new Gtk.Builder();
        buildable.add_from_file(this.dir.get_path() + "/prefs.xml");

        const settings = this.getSettings();
        settings.bind(
            "hide-indicator-when-not-inhibited",
            buildable.get_object("field-hide-indicator-when-not-inhibited"),
            "active",
            Gio.SettingsBindFlags.DEFAULT,
        );
        settings.bind(
            "enable-positioning",
            buildable.get_object("field-enable-positioning"),
            "active",
            Gio.SettingsBindFlags.DEFAULT,
        );
        settings.bind(
            "enable-positioning",
            buildable.get_object("box-position"),
            "sensitive",
            Gio.SettingsBindFlags.DEFAULT,
        );
        settings.bind(
            "position-box",
            buildable.get_object("field-position-box"),
            "active",
            Gio.SettingsBindFlags.DEFAULT,
        );
        settings.bind(
            "position-number",
            buildable.get_object("field-position-number"),
            "value",
            Gio.SettingsBindFlags.DEFAULT,
        );

        window.add(buildable.get_object("main"));
    }
}
