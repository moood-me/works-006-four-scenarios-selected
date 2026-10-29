// The bay's floor: the near bank where the viewer stands (0), going down under the water (its surface at -0.48) to
// 2.4 m deep from 4 m out — where the pier's end, the stone and the Mermaid are; behind the viewer the sand runs back
// level, then the bank rises 2 m from 6 to 11 m behind to the field on its top (the shore's view)
return -2.4 * anim.span(distance, 0.8, 4) + 2 * anim.span(-distance, 6, 11);
