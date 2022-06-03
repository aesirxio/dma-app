/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

export default function removeScript(d, id) {
  const element = d.getElementById(id);

  if (element) {
    element.parentNode.removeChild(element);
  }
}
