var Gt = Array.isArray, zn = Array.prototype.indexOf, He = Array.prototype.includes, It = Array.from, Hn = Object.defineProperty, st = Object.getOwnPropertyDescriptor, qn = Object.getOwnPropertyDescriptors, Yn = Object.prototype, $n = Array.prototype, Lr = Object.getPrototypeOf, hr = Object.isExtensible;
const Wn = () => {
};
function Gn(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Or() {
  var e, t, r = new Promise((n, i) => {
    e = n, t = i;
  });
  return { promise: r, resolve: e, reject: t };
}
const H = 2, dt = 4, vt = 8, Xt = 1 << 24, be = 16, ce = 32, Be = 64, Ut = 128, re = 512, K = 1024, $ = 2048, ue = 4096, ee = 8192, xe = 16384, Pe = 32768, qe = 65536, _r = 1 << 17, Cr = 1 << 18, Ge = 1 << 19, Nr = 1 << 20, ge = 1 << 25, Fe = 65536, Bt = 1 << 21, Zt = 1 << 22, Te = 1 << 23, Ke = Symbol("$state"), Xn = Symbol(""), Oe = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), Mr = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function Zn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Jn(e, t, r) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function Qn(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function ei() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function ti(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function ri() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ni() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ii() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function si() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function li() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const ai = 1, fi = 2, Dr = 4, oi = 8, ui = 16, ci = 2, V = Symbol(), Pr = "http://www.w3.org/1999/xhtml", di = "@attach";
function vi() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function hi() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Fr(e) {
  return e === this.v;
}
function _i(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function Ur(e) {
  return !_i(e, this.v);
}
let ie = null;
function Ye(e) {
  ie = e;
}
function ht(e, t = !1, r) {
  ie = {
    p: ie,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    l: null
  };
}
function _t(e) {
  var t = (
    /** @type {ComponentContext} */
    ie
  ), r = t.e;
  if (r !== null) {
    t.e = null;
    for (var n of r)
      sn(n);
  }
  return t.i = !0, ie = t.p, /** @type {T} */
  {};
}
function Br() {
  return !0;
}
let Ce = [];
function jr() {
  var e = Ce;
  Ce = [], Gn(e);
}
function he(e) {
  if (Ce.length === 0 && !lt) {
    var t = Ce;
    queueMicrotask(() => {
      t === Ce && jr();
    });
  }
  Ce.push(e);
}
function pi() {
  for (; Ce.length > 0; )
    jr();
}
function Vr(e) {
  var t = C;
  if (t === null)
    return I.f |= Te, e;
  if ((t.f & Pe) === 0 && (t.f & dt) === 0)
    throw e;
  Ee(e, t);
}
function Ee(e, t) {
  for (; t !== null; ) {
    if ((t.f & Ut) !== 0) {
      if ((t.f & Pe) === 0)
        throw e;
      try {
        t.b.error(e);
        return;
      } catch (r) {
        e = r;
      }
    }
    t = t.parent;
  }
  throw e;
}
const gi = -7169;
function P(e, t) {
  e.f = e.f & gi | t;
}
function Jt(e) {
  (e.f & re) !== 0 || e.deps === null ? P(e, K) : P(e, ue);
}
function Kr(e) {
  if (e !== null)
    for (const t of e)
      (t.f & H) === 0 || (t.f & Fe) === 0 || (t.f ^= Fe, Kr(
        /** @type {Derived} */
        t.deps
      ));
}
function zr(e, t, r) {
  (e.f & $) !== 0 ? t.add(e) : (e.f & ue) !== 0 && r.add(e), Kr(e.deps), P(e, K);
}
const wt = /* @__PURE__ */ new Set();
let N = null, jt = null, ae = null, X = [], At = null, Vt = !1, lt = !1;
class Ie {
  /**
   * The current values of any sources that are updated in this batch
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Source, any>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any sources that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Source, any>}
   */
  previous = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<() => void>}
   */
  #t = /* @__PURE__ */ new Set();
  /**
   * If a fork is discarded, we need to destroy any effects that are no longer needed
   * @type {Set<(batch: Batch) => void>}
   */
  #r = /* @__PURE__ */ new Set();
  /**
   * The number of async effects that are currently in flight
   */
  #e = 0;
  /**
   * The number of async effects that are currently in flight, _not_ inside a pending boundary
   */
  #a = 0;
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #n = null;
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Set<Effect>}
   */
  #s = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #i = /* @__PURE__ */ new Set();
  /**
   * A map of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`.
   * The value contains child effects that were dirty/maybe_dirty before being reset,
   * so they can be rescheduled if the branch survives.
   * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
   */
  #l = /* @__PURE__ */ new Map();
  is_fork = !1;
  #f = !1;
  #u() {
    return this.is_fork || this.#a > 0;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    this.#l.has(t) || this.#l.set(t, { d: [], m: [] });
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   */
  unskip_effect(t) {
    var r = this.#l.get(t);
    if (r) {
      this.#l.delete(t);
      for (var n of r.d)
        P(n, $), fe(n);
      for (n of r.m)
        P(n, ue), fe(n);
    }
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    X = [], this.apply();
    var r = [], n = [];
    for (const i of t)
      this.#o(i, r, n);
    if (this.#u()) {
      this.#c(n), this.#c(r);
      for (const [i, s] of this.#l)
        $r(i, s);
    } else {
      for (const i of this.#t) i();
      this.#t.clear(), this.#e === 0 && this.#v(), jt = this, N = null, pr(n), pr(r), this.#s.clear(), this.#i.clear(), jt = null, this.#n?.resolve();
    }
    ae = null;
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #o(t, r, n) {
    t.f ^= K;
    for (var i = t.first; i !== null; ) {
      var s = i.f, a = (s & (ce | Be)) !== 0, f = a && (s & K) !== 0, l = f || (s & ee) !== 0 || this.#l.has(i);
      if (!l && i.fn !== null) {
        a ? i.f ^= K : (s & dt) !== 0 ? r.push(i) : pt(i) && ((s & be) !== 0 && this.#i.add(i), We(i));
        var o = i.first;
        if (o !== null) {
          i = o;
          continue;
        }
      }
      for (; i !== null; ) {
        var u = i.next;
        if (u !== null) {
          i = u;
          break;
        }
        i = i.parent;
      }
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #c(t) {
    for (var r = 0; r < t.length; r += 1)
      zr(t[r], this.#s, this.#i);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, r) {
    r !== V && !this.previous.has(t) && this.previous.set(t, r), (t.f & Te) === 0 && (this.current.set(t, t.v), ae?.set(t, t.v));
  }
  activate() {
    N = this, this.apply();
  }
  deactivate() {
    N === this && (N = null, ae = null);
  }
  flush() {
    if (this.activate(), X.length > 0) {
      if (Hr(), N !== null && N !== this)
        return;
    } else this.#e === 0 && this.process([]);
    this.deactivate();
  }
  discard() {
    for (const t of this.#r) t(this);
    this.#r.clear();
  }
  #v() {
    if (wt.size > 1) {
      this.previous.clear();
      var t = ae, r = !0;
      for (const i of wt) {
        if (i === this) {
          r = !1;
          continue;
        }
        const s = [];
        for (const [f, l] of this.current) {
          if (i.current.has(f))
            if (r && l !== i.current.get(f))
              i.current.set(f, l);
            else
              continue;
          s.push(f);
        }
        if (s.length === 0)
          continue;
        const a = [...i.current.keys()].filter((f) => !this.current.has(f));
        if (a.length > 0) {
          var n = X;
          X = [];
          const f = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
          for (const o of s)
            qr(o, a, f, l);
          if (X.length > 0) {
            N = i, i.apply();
            for (const o of X)
              i.#o(o, [], []);
            i.deactivate();
          }
          X = n;
        }
      }
      N = null, ae = t;
    }
    this.#l.clear(), wt.delete(this);
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(t) {
    this.#e += 1, t && (this.#a += 1);
  }
  /**
   *
   * @param {boolean} blocking
   */
  decrement(t) {
    this.#e -= 1, t && (this.#a -= 1), !this.#f && (this.#f = !0, he(() => {
      this.#f = !1, this.#u() ? X.length > 0 && this.flush() : this.revive();
    }));
  }
  revive() {
    for (const t of this.#s)
      this.#i.delete(t), P(t, $), fe(t);
    for (const t of this.#i)
      P(t, ue), fe(t);
    this.flush();
  }
  /** @param {() => void} fn */
  oncommit(t) {
    this.#t.add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    this.#r.add(t);
  }
  settled() {
    return (this.#n ??= Or()).promise;
  }
  static ensure() {
    if (N === null) {
      const t = N = new Ie();
      wt.add(N), lt || he(() => {
        N === t && t.flush();
      });
    }
    return N;
  }
  apply() {
  }
}
function wi(e) {
  var t = lt;
  lt = !0;
  try {
    for (var r; ; ) {
      if (pi(), X.length === 0 && (N?.flush(), X.length === 0))
        return At = null, /** @type {T} */
        r;
      Hr();
    }
  } finally {
    lt = t;
  }
}
function Hr() {
  Vt = !0;
  var e = null;
  try {
    for (var t = 0; X.length > 0; ) {
      var r = Ie.ensure();
      if (t++ > 1e3) {
        var n, i;
        bi();
      }
      r.process(X), Ae.clear();
    }
  } finally {
    X = [], Vt = !1, At = null;
  }
}
function bi() {
  try {
    ri();
  } catch (e) {
    Ee(e, At);
  }
}
let pe = null;
function pr(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var n = e[r++];
      if ((n.f & (xe | ee)) === 0 && pt(n) && (pe = /* @__PURE__ */ new Set(), We(n), n.deps === null && n.first === null && n.nodes === null && n.teardown === null && n.ac === null && fn(n), pe?.size > 0)) {
        Ae.clear();
        for (const i of pe) {
          if ((i.f & (xe | ee)) !== 0) continue;
          const s = [i];
          let a = i.parent;
          for (; a !== null; )
            pe.has(a) && (pe.delete(a), s.push(a)), a = a.parent;
          for (let f = s.length - 1; f >= 0; f--) {
            const l = s[f];
            (l.f & (xe | ee)) === 0 && We(l);
          }
        }
        pe.clear();
      }
    }
    pe = null;
  }
}
function qr(e, t, r, n) {
  if (!r.has(e) && (r.add(e), e.reactions !== null))
    for (const i of e.reactions) {
      const s = i.f;
      (s & H) !== 0 ? qr(
        /** @type {Derived} */
        i,
        t,
        r,
        n
      ) : (s & (Zt | be)) !== 0 && (s & $) === 0 && Yr(i, t, n) && (P(i, $), fe(
        /** @type {Effect} */
        i
      ));
    }
}
function Yr(e, t, r) {
  const n = r.get(e);
  if (n !== void 0) return n;
  if (e.deps !== null)
    for (const i of e.deps) {
      if (He.call(t, i))
        return !0;
      if ((i.f & H) !== 0 && Yr(
        /** @type {Derived} */
        i,
        t,
        r
      ))
        return r.set(
          /** @type {Derived} */
          i,
          !0
        ), !0;
    }
  return r.set(e, !1), !1;
}
function fe(e) {
  var t = At = e, r = t.b;
  if (r?.is_pending && (e.f & (dt | vt | Xt)) !== 0 && (e.f & Pe) === 0) {
    r.defer_effect(e);
    return;
  }
  for (; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (Vt && t === C && (n & be) !== 0 && (n & Cr) === 0 && (n & Pe) !== 0)
      return;
    if ((n & (Be | ce)) !== 0) {
      if ((n & K) === 0)
        return;
      t.f ^= K;
    }
  }
  X.push(t);
}
function $r(e, t) {
  if (!((e.f & ce) !== 0 && (e.f & K) !== 0)) {
    (e.f & $) !== 0 ? t.d.push(e) : (e.f & ue) !== 0 && t.m.push(e), P(e, K);
    for (var r = e.first; r !== null; )
      $r(r, t), r = r.next;
  }
}
function mi(e) {
  let t = 0, r = Re(0), n;
  return () => {
    tr() && (_(r), ir(() => (t === 0 && (n = fr(() => e(() => Se(r)))), t += 1, () => {
      he(() => {
        t -= 1, t === 0 && (n?.(), n = void 0, Se(r));
      });
    })));
  };
}
var yi = qe | Ge;
function Ei(e, t, r, n) {
  new ki(e, t, r, n);
}
class ki {
  /** @type {Boundary | null} */
  parent;
  is_pending = !1;
  /**
   * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
   * Inherited from parent boundary, or defaults to identity.
   * @type {(error: unknown) => unknown}
   */
  transform_error;
  /** @type {TemplateNode} */
  #t;
  /** @type {TemplateNode | null} */
  #r = null;
  /** @type {BoundaryProps} */
  #e;
  /** @type {((anchor: Node) => void)} */
  #a;
  /** @type {Effect} */
  #n;
  /** @type {Effect | null} */
  #s = null;
  /** @type {Effect | null} */
  #i = null;
  /** @type {Effect | null} */
  #l = null;
  /** @type {DocumentFragment | null} */
  #f = null;
  #u = 0;
  #o = 0;
  #c = !1;
  /** @type {Set<Effect>} */
  #v = /* @__PURE__ */ new Set();
  /** @type {Set<Effect>} */
  #h = /* @__PURE__ */ new Set();
  /**
   * A source containing the number of pending async deriveds/expressions.
   * Only created if `$effect.pending()` is used inside the boundary,
   * otherwise updating the source results in needless `Batch.ensure()`
   * calls followed by no-op flushes
   * @type {Source<number> | null}
   */
  #d = null;
  #b = mi(() => (this.#d = Re(this.#u), () => {
    this.#d = null;
  }));
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, r, n, i) {
    this.#t = t, this.#e = r, this.#a = (s) => {
      var a = (
        /** @type {Effect} */
        C
      );
      a.b = this, a.f |= Ut, n(s);
    }, this.parent = /** @type {Effect} */
    C.b, this.transform_error = i ?? this.parent?.transform_error ?? ((s) => s), this.#n = sr(() => {
      this.#g();
    }, yi);
  }
  #m() {
    try {
      this.#s = J(() => this.#a(this.#t));
    } catch (t) {
      this.error(t);
    }
  }
  /**
   * @param {unknown} error The deserialized error from the server's hydration comment
   */
  #y(t) {
    const r = this.#e.failed;
    r && (this.#l = J(() => {
      r(
        this.#t,
        () => t,
        () => () => {
        }
      );
    }));
  }
  #E() {
    const t = this.#e.pending;
    t && (this.is_pending = !0, this.#i = J(() => t(this.#t)), he(() => {
      var r = this.#f = document.createDocumentFragment(), n = Me();
      r.append(n), this.#s = this.#p(() => (Ie.ensure(), J(() => this.#a(n)))), this.#o === 0 && (this.#t.before(r), this.#f = null, De(
        /** @type {Effect} */
        this.#i,
        () => {
          this.#i = null;
        }
      ), this.#_());
    }));
  }
  #g() {
    try {
      if (this.is_pending = this.has_pending_snippet(), this.#o = 0, this.#u = 0, this.#s = J(() => {
        this.#a(this.#t);
      }), this.#o > 0) {
        var t = this.#f = document.createDocumentFragment();
        cn(this.#s, t);
        const r = (
          /** @type {(anchor: Node) => void} */
          this.#e.pending
        );
        this.#i = J(() => r(this.#t));
      } else
        this.#_();
    } catch (r) {
      this.error(r);
    }
  }
  #_() {
    this.is_pending = !1;
    for (const t of this.#v)
      P(t, $), fe(t);
    for (const t of this.#h)
      P(t, ue), fe(t);
    this.#v.clear(), this.#h.clear();
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    zr(t, this.#v, this.#h);
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!this.#e.pending;
  }
  /**
   * @template T
   * @param {() => T} fn
   */
  #p(t) {
    var r = C, n = I, i = ie;
    _e(this.#n), se(this.#n), Ye(this.#n.ctx);
    try {
      return t();
    } catch (s) {
      return Vr(s), null;
    } finally {
      _e(r), se(n), Ye(i);
    }
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   */
  #w(t) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#w(t);
      return;
    }
    this.#o += t, this.#o === 0 && (this.#_(), this.#i && De(this.#i, () => {
      this.#i = null;
    }), this.#f && (this.#t.before(this.#f), this.#f = null));
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   */
  update_pending_count(t) {
    this.#w(t), this.#u += t, !(!this.#d || this.#c) && (this.#c = !0, he(() => {
      this.#c = !1, this.#d && $e(this.#d, this.#u);
    }));
  }
  get_effect_pending() {
    return this.#b(), _(
      /** @type {Source<number>} */
      this.#d
    );
  }
  /** @param {unknown} error */
  error(t) {
    var r = this.#e.onerror;
    let n = this.#e.failed;
    if (!r && !n)
      throw t;
    this.#s && (z(this.#s), this.#s = null), this.#i && (z(this.#i), this.#i = null), this.#l && (z(this.#l), this.#l = null);
    var i = !1, s = !1;
    const a = () => {
      if (i) {
        hi();
        return;
      }
      i = !0, s && li(), this.#l !== null && De(this.#l, () => {
        this.#l = null;
      }), this.#p(() => {
        Ie.ensure(), this.#g();
      });
    }, f = (l) => {
      try {
        s = !0, r?.(l, a), s = !1;
      } catch (o) {
        Ee(o, this.#n && this.#n.parent);
      }
      n && (this.#l = this.#p(() => {
        Ie.ensure();
        try {
          return J(() => {
            var o = (
              /** @type {Effect} */
              C
            );
            o.b = this, o.f |= Ut, n(
              this.#t,
              () => l,
              () => a
            );
          });
        } catch (o) {
          return Ee(
            o,
            /** @type {Effect} */
            this.#n.parent
          ), null;
        }
      }));
    };
    he(() => {
      var l;
      try {
        l = this.transform_error(t);
      } catch (o) {
        Ee(o, this.#n && this.#n.parent);
        return;
      }
      l !== null && typeof l == "object" && typeof /** @type {any} */
      l.then == "function" ? l.then(
        f,
        /** @param {unknown} e */
        (o) => Ee(o, this.#n && this.#n.parent)
      ) : f(l);
    });
  }
}
function Wr(e, t, r, n) {
  const i = Qt;
  var s = e.filter((c) => !c.settled);
  if (r.length === 0 && s.length === 0) {
    n(t.map(i));
    return;
  }
  var a = (
    /** @type {Effect} */
    C
  ), f = xi(), l = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((c) => c.promise)) : null;
  function o(c) {
    f();
    try {
      n(c);
    } catch (d) {
      (a.f & xe) === 0 && Ee(d, a);
    }
    Kt();
  }
  if (r.length === 0) {
    l.then(() => o(t.map(i)));
    return;
  }
  function u() {
    f(), Promise.all(r.map((c) => /* @__PURE__ */ Ii(c))).then((c) => o([...t.map(i), ...c])).catch((c) => Ee(c, a));
  }
  l ? l.then(u) : u();
}
function xi() {
  var e = C, t = I, r = ie, n = N;
  return function(s = !0) {
    _e(e), se(t), Ye(r), s && n?.activate();
  };
}
function Kt(e = !0) {
  _e(null), se(null), Ye(null), e && N?.deactivate();
}
function Ti() {
  var e = (
    /** @type {Boundary} */
    /** @type {Effect} */
    C.b
  ), t = (
    /** @type {Batch} */
    N
  ), r = e.is_rendered();
  return e.update_pending_count(1), t.increment(r), () => {
    e.update_pending_count(-1), t.decrement(r);
  };
}
// @__NO_SIDE_EFFECTS__
function Qt(e) {
  var t = H | $, r = I !== null && (I.f & H) !== 0 ? (
    /** @type {Derived} */
    I
  ) : null;
  return C !== null && (C.f |= Ge), {
    ctx: ie,
    deps: null,
    effects: null,
    equals: Fr,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      V
    ),
    wv: 0,
    parent: r ?? C,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Ii(e, t, r) {
  /** @type {Effect | null} */
  C === null && Zn();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = Re(
    /** @type {V} */
    V
  ), a = !I, f = /* @__PURE__ */ new Map();
  return zi(() => {
    var l = Or();
    i = l.promise;
    try {
      Promise.resolve(e()).then(l.resolve, l.reject).finally(Kt);
    } catch (d) {
      l.reject(d), Kt();
    }
    var o = (
      /** @type {Batch} */
      N
    );
    if (a) {
      var u = Ti();
      f.get(o)?.reject(Oe), f.delete(o), f.set(o, l);
    }
    const c = (d, w = void 0) => {
      if (o.activate(), w)
        w !== Oe && (s.f |= Te, $e(s, w));
      else {
        (s.f & Te) !== 0 && (s.f ^= Te), $e(s, d);
        for (const [g, m] of f) {
          if (f.delete(g), g === o) break;
          m.reject(Oe);
        }
      }
      u && u();
    };
    l.promise.then(c, (d) => c(null, d || "unknown"));
  }), rr(() => {
    for (const l of f.values())
      l.reject(Oe);
  }), new Promise((l) => {
    function o(u) {
      function c() {
        u === i ? l(s) : o(i);
      }
      u.then(c, c);
    }
    o(i);
  });
}
// @__NO_SIDE_EFFECTS__
function Le(e) {
  const t = /* @__PURE__ */ Qt(e);
  return dn(t), t;
}
// @__NO_SIDE_EFFECTS__
function Ai(e) {
  const t = /* @__PURE__ */ Qt(e);
  return t.equals = Ur, t;
}
function Si(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1)
      z(
        /** @type {Effect} */
        t[r]
      );
  }
}
function Ri(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & H) === 0)
      return (t.f & xe) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function er(e) {
  var t, r = C;
  _e(Ri(e));
  try {
    e.f &= ~Fe, Si(e), t = pn(e);
  } finally {
    _e(r);
  }
  return t;
}
function Gr(e) {
  var t = er(e);
  if (!e.equals(t) && (e.wv = hn(), (!N?.is_fork || e.deps === null) && (e.v = t, e.deps === null))) {
    P(e, K);
    return;
  }
  Ue || (ae !== null ? (tr() || N?.is_fork) && ae.set(e, t) : Jt(e));
}
function Li(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(Oe), t.teardown = Wn, t.ac = null, ft(t, 0), lr(t));
}
function Xr(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && We(t);
}
let zt = /* @__PURE__ */ new Set();
const Ae = /* @__PURE__ */ new Map();
let Zr = !1;
function Re(e, t) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Fr,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function M(e, t) {
  const r = Re(e);
  return dn(r), r;
}
// @__NO_SIDE_EFFECTS__
function Oi(e, t = !1, r = !0) {
  const n = Re(e);
  return t || (n.equals = Ur), n;
}
function T(e, t, r = !1) {
  I !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!oe || (I.f & _r) !== 0) && Br() && (I.f & (H | be | Zt | _r)) !== 0 && (ne === null || !He.call(ne, e)) && si();
  let n = r ? rt(t) : t;
  return $e(e, n);
}
function $e(e, t) {
  if (!e.equals(t)) {
    var r = e.v;
    Ue ? Ae.set(e, t) : Ae.set(e, r), e.v = t;
    var n = Ie.ensure();
    if (n.capture(e, r), (e.f & H) !== 0) {
      const i = (
        /** @type {Derived} */
        e
      );
      (e.f & $) !== 0 && er(i), Jt(i);
    }
    e.wv = hn(), Jr(e, $), C !== null && (C.f & K) !== 0 && (C.f & (ce | Be)) === 0 && (te === null ? Yi([e]) : te.push(e)), !n.is_fork && zt.size > 0 && !Zr && Ci();
  }
  return t;
}
function Ci() {
  Zr = !1;
  for (const e of zt)
    (e.f & K) !== 0 && P(e, ue), pt(e) && We(e);
  zt.clear();
}
function Se(e) {
  T(e, e.v + 1);
}
function Jr(e, t) {
  var r = e.reactions;
  if (r !== null)
    for (var n = r.length, i = 0; i < n; i++) {
      var s = r[i], a = s.f, f = (a & $) === 0;
      if (f && P(s, t), (a & H) !== 0) {
        var l = (
          /** @type {Derived} */
          s
        );
        ae?.delete(l), (a & Fe) === 0 && (a & re && (s.f |= Fe), Jr(l, ue));
      } else f && ((a & be) !== 0 && pe !== null && pe.add(
        /** @type {Effect} */
        s
      ), fe(
        /** @type {Effect} */
        s
      ));
    }
}
function rt(e) {
  if (typeof e != "object" || e === null || Ke in e)
    return e;
  const t = Lr(e);
  if (t !== Yn && t !== $n)
    return e;
  var r = /* @__PURE__ */ new Map(), n = Gt(e), i = /* @__PURE__ */ M(0), s = we, a = (f) => {
    if (we === s)
      return f();
    var l = I, o = we;
    se(null), mr(s);
    var u = f();
    return se(l), mr(o), u;
  };
  return n && r.set("length", /* @__PURE__ */ M(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(f, l, o) {
        (!("value" in o) || o.configurable === !1 || o.enumerable === !1 || o.writable === !1) && ni();
        var u = r.get(l);
        return u === void 0 ? a(() => {
          var c = /* @__PURE__ */ M(o.value);
          return r.set(l, c), c;
        }) : T(u, o.value, !0), !0;
      },
      deleteProperty(f, l) {
        var o = r.get(l);
        if (o === void 0) {
          if (l in f) {
            const u = a(() => /* @__PURE__ */ M(V));
            r.set(l, u), Se(i);
          }
        } else
          T(o, V), Se(i);
        return !0;
      },
      get(f, l, o) {
        if (l === Ke)
          return e;
        var u = r.get(l), c = l in f;
        if (u === void 0 && (!c || st(f, l)?.writable) && (u = a(() => {
          var w = rt(c ? f[l] : V), g = /* @__PURE__ */ M(w);
          return g;
        }), r.set(l, u)), u !== void 0) {
          var d = _(u);
          return d === V ? void 0 : d;
        }
        return Reflect.get(f, l, o);
      },
      getOwnPropertyDescriptor(f, l) {
        var o = Reflect.getOwnPropertyDescriptor(f, l);
        if (o && "value" in o) {
          var u = r.get(l);
          u && (o.value = _(u));
        } else if (o === void 0) {
          var c = r.get(l), d = c?.v;
          if (c !== void 0 && d !== V)
            return {
              enumerable: !0,
              configurable: !0,
              value: d,
              writable: !0
            };
        }
        return o;
      },
      has(f, l) {
        if (l === Ke)
          return !0;
        var o = r.get(l), u = o !== void 0 && o.v !== V || Reflect.has(f, l);
        if (o !== void 0 || C !== null && (!u || st(f, l)?.writable)) {
          o === void 0 && (o = a(() => {
            var d = u ? rt(f[l]) : V, w = /* @__PURE__ */ M(d);
            return w;
          }), r.set(l, o));
          var c = _(o);
          if (c === V)
            return !1;
        }
        return u;
      },
      set(f, l, o, u) {
        var c = r.get(l), d = l in f;
        if (n && l === "length")
          for (var w = o; w < /** @type {Source<number>} */
          c.v; w += 1) {
            var g = r.get(w + "");
            g !== void 0 ? T(g, V) : w in f && (g = a(() => /* @__PURE__ */ M(V)), r.set(w + "", g));
          }
        if (c === void 0)
          (!d || st(f, l)?.writable) && (c = a(() => /* @__PURE__ */ M(void 0)), T(c, rt(o)), r.set(l, c));
        else {
          d = c.v !== V;
          var m = a(() => rt(o));
          T(c, m);
        }
        var v = Reflect.getOwnPropertyDescriptor(f, l);
        if (v?.set && v.set.call(u, o), !d) {
          if (n && typeof l == "string") {
            var p = (
              /** @type {Source<number>} */
              r.get("length")
            ), F = Number(l);
            Number.isInteger(F) && F >= p.v && T(p, F + 1);
          }
          Se(i);
        }
        return !0;
      },
      ownKeys(f) {
        _(i);
        var l = Reflect.ownKeys(f).filter((c) => {
          var d = r.get(c);
          return d === void 0 || d.v !== V;
        });
        for (var [o, u] of r)
          u.v !== V && !(o in f) && l.push(o);
        return l;
      },
      setPrototypeOf() {
        ii();
      }
    }
  );
}
function gr(e) {
  try {
    if (e !== null && typeof e == "object" && Ke in e)
      return e[Ke];
  } catch {
  }
  return e;
}
function Ni(e, t) {
  return Object.is(gr(e), gr(t));
}
var Ht, Qr, en, tn;
function Mi() {
  if (Ht === void 0) {
    Ht = window, Qr = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, r = Text.prototype;
    en = st(t, "firstChild").get, tn = st(t, "nextSibling").get, hr(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), hr(r) && (r.__t = void 0);
  }
}
function Me(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function kt(e) {
  return (
    /** @type {TemplateNode | null} */
    en.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function St(e) {
  return (
    /** @type {TemplateNode | null} */
    tn.call(e)
  );
}
function B(e, t) {
  return /* @__PURE__ */ kt(e);
}
function ve(e, t = 1, r = !1) {
  let n = e;
  for (; t--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ St(n);
  return n;
}
function Di(e) {
  e.textContent = "";
}
function rn() {
  return !1;
}
function Pi(e, t, r) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(Pr, e, void 0)
  );
}
function Fi(e, t) {
  if (t) {
    const r = document.body;
    e.autofocus = !0, he(() => {
      document.activeElement === r && e.focus();
    });
  }
}
let wr = !1;
function Ui() {
  wr || (wr = !0, document.addEventListener(
    "reset",
    (e) => {
      Promise.resolve().then(() => {
        if (!e.defaultPrevented)
          for (
            const t of
            /**@type {HTMLFormElement} */
            e.target.elements
          )
            t.__on_r?.();
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Rt(e) {
  var t = I, r = C;
  se(null), _e(null);
  try {
    return e();
  } finally {
    se(t), _e(r);
  }
}
function Bi(e, t, r, n = r) {
  e.addEventListener(t, () => Rt(r));
  const i = e.__on_r;
  i ? e.__on_r = () => {
    i(), n(!0);
  } : e.__on_r = () => n(!0), Ui();
}
function nn(e) {
  C === null && (I === null && ti(), ei()), Ue && Qn();
}
function ji(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function de(e, t, r) {
  var n = C;
  n !== null && (n.f & ee) !== 0 && (e |= ee);
  var i = {
    ctx: ie,
    deps: null,
    nodes: null,
    f: e | $ | re,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: n,
    b: n && n.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  if (r)
    try {
      We(i);
    } catch (f) {
      throw z(i), f;
    }
  else t !== null && fe(i);
  var s = i;
  if (r && s.deps === null && s.teardown === null && s.nodes === null && s.first === s.last && // either `null`, or a singular child
  (s.f & Ge) === 0 && (s = s.first, (e & be) !== 0 && (e & qe) !== 0 && s !== null && (s.f |= qe)), s !== null && (s.parent = n, n !== null && ji(s, n), I !== null && (I.f & H) !== 0 && (e & Be) === 0)) {
    var a = (
      /** @type {Derived} */
      I
    );
    (a.effects ??= []).push(s);
  }
  return i;
}
function tr() {
  return I !== null && !oe;
}
function rr(e) {
  const t = de(vt, null, !1);
  return P(t, K), t.teardown = e, t;
}
function xt(e) {
  nn();
  var t = (
    /** @type {Effect} */
    C.f
  ), r = !I && (t & ce) !== 0 && (t & Pe) === 0;
  if (r) {
    var n = (
      /** @type {ComponentContext} */
      ie
    );
    (n.e ??= []).push(e);
  } else
    return sn(e);
}
function sn(e) {
  return de(dt | Nr, e, !1);
}
function Vi(e) {
  return nn(), de(vt | Nr, e, !0);
}
function Ki(e) {
  Ie.ensure();
  const t = de(Be | Ge, e, !0);
  return (r = {}) => new Promise((n) => {
    r.outro ? De(t, () => {
      z(t), n(void 0);
    }) : (z(t), n(void 0));
  });
}
function nr(e) {
  return de(dt, e, !1);
}
function zi(e) {
  return de(Zt | Ge, e, !0);
}
function ir(e, t = 0) {
  return de(vt | t, e, !0);
}
function at(e, t = [], r = [], n = []) {
  Wr(n, t, r, (i) => {
    de(vt, () => e(...i.map(_)), !0);
  });
}
function sr(e, t = 0) {
  var r = de(be | t, e, !0);
  return r;
}
function ln(e, t = 0) {
  var r = de(Xt | t, e, !0);
  return r;
}
function J(e) {
  return de(ce | Ge, e, !0);
}
function an(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = Ue, n = I;
    br(!0), se(null);
    try {
      t.call(null);
    } finally {
      br(r), se(n);
    }
  }
}
function lr(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    const i = r.ac;
    i !== null && Rt(() => {
      i.abort(Oe);
    });
    var n = r.next;
    (r.f & Be) !== 0 ? r.parent = null : z(r, t), r = n;
  }
}
function Hi(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & ce) === 0 && z(t), t = r;
  }
}
function z(e, t = !0) {
  var r = !1;
  (t || (e.f & Cr) !== 0) && e.nodes !== null && e.nodes.end !== null && (qi(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), r = !0), lr(e, t && !r), ft(e, 0), P(e, xe);
  var n = e.nodes && e.nodes.t;
  if (n !== null)
    for (const s of n)
      s.stop();
  an(e);
  var i = e.parent;
  i !== null && i.first !== null && fn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function qi(e, t) {
  for (; e !== null; ) {
    var r = e === t ? null : /* @__PURE__ */ St(e);
    e.remove(), e = r;
  }
}
function fn(e) {
  var t = e.parent, r = e.prev, n = e.next;
  r !== null && (r.next = n), n !== null && (n.prev = r), t !== null && (t.first === e && (t.first = n), t.last === e && (t.last = r));
}
function De(e, t, r = !0) {
  var n = [];
  on(e, n, !0);
  var i = () => {
    r && z(e), t && t();
  }, s = n.length;
  if (s > 0) {
    var a = () => --s || i();
    for (var f of n)
      f.out(a);
  } else
    i();
}
function on(e, t, r) {
  if ((e.f & ee) === 0) {
    e.f ^= ee;
    var n = e.nodes && e.nodes.t;
    if (n !== null)
      for (const f of n)
        (f.is_global || r) && t.push(f);
    for (var i = e.first; i !== null; ) {
      var s = i.next, a = (i.f & qe) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (i.f & ce) !== 0 && (e.f & be) !== 0;
      on(i, t, a ? r : !1), i = s;
    }
  }
}
function ar(e) {
  un(e, !0);
}
function un(e, t) {
  if ((e.f & ee) !== 0) {
    e.f ^= ee, (e.f & K) === 0 && (P(e, $), fe(e));
    for (var r = e.first; r !== null; ) {
      var n = r.next, i = (r.f & qe) !== 0 || (r.f & ce) !== 0;
      un(r, i ? t : !1), r = n;
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null)
      for (const a of s)
        (a.is_global || t) && a.in();
  }
}
function cn(e, t) {
  if (e.nodes)
    for (var r = e.nodes.start, n = e.nodes.end; r !== null; ) {
      var i = r === n ? null : /* @__PURE__ */ St(r);
      t.append(r), r = i;
    }
}
let yt = !1, Ue = !1;
function br(e) {
  Ue = e;
}
let I = null, oe = !1;
function se(e) {
  I = e;
}
let C = null;
function _e(e) {
  C = e;
}
let ne = null;
function dn(e) {
  I !== null && (ne === null ? ne = [e] : ne.push(e));
}
let Z = null, Q = 0, te = null;
function Yi(e) {
  te = e;
}
let vn = 1, Ne = 0, we = Ne;
function mr(e) {
  we = e;
}
function hn() {
  return ++vn;
}
function pt(e) {
  var t = e.f;
  if ((t & $) !== 0)
    return !0;
  if (t & H && (e.f &= ~Fe), (t & ue) !== 0) {
    for (var r = (
      /** @type {Value[]} */
      e.deps
    ), n = r.length, i = 0; i < n; i++) {
      var s = r[i];
      if (pt(
        /** @type {Derived} */
        s
      ) && Gr(
        /** @type {Derived} */
        s
      ), s.wv > e.wv)
        return !0;
    }
    (t & re) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    ae === null && P(e, K);
  }
  return !1;
}
function _n(e, t, r = !0) {
  var n = e.reactions;
  if (n !== null && !(ne !== null && He.call(ne, e)))
    for (var i = 0; i < n.length; i++) {
      var s = n[i];
      (s.f & H) !== 0 ? _n(
        /** @type {Derived} */
        s,
        t,
        !1
      ) : t === s && (r ? P(s, $) : (s.f & K) !== 0 && P(s, ue), fe(
        /** @type {Effect} */
        s
      ));
    }
}
function pn(e) {
  var t = Z, r = Q, n = te, i = I, s = ne, a = ie, f = oe, l = we, o = e.f;
  Z = /** @type {null | Value[]} */
  null, Q = 0, te = null, I = (o & (ce | Be)) === 0 ? e : null, ne = null, Ye(e.ctx), oe = !1, we = ++Ne, e.ac !== null && (Rt(() => {
    e.ac.abort(Oe);
  }), e.ac = null);
  try {
    e.f |= Bt;
    var u = (
      /** @type {Function} */
      e.fn
    ), c = u();
    e.f |= Pe;
    var d = e.deps, w = N?.is_fork;
    if (Z !== null) {
      var g;
      if (w || ft(e, Q), d !== null && Q > 0)
        for (d.length = Q + Z.length, g = 0; g < Z.length; g++)
          d[Q + g] = Z[g];
      else
        e.deps = d = Z;
      if (tr() && (e.f & re) !== 0)
        for (g = Q; g < d.length; g++)
          (d[g].reactions ??= []).push(e);
    } else !w && d !== null && Q < d.length && (ft(e, Q), d.length = Q);
    if (Br() && te !== null && !oe && d !== null && (e.f & (H | ue | $)) === 0)
      for (g = 0; g < /** @type {Source[]} */
      te.length; g++)
        _n(
          te[g],
          /** @type {Effect} */
          e
        );
    if (i !== null && i !== e) {
      if (Ne++, i.deps !== null)
        for (let m = 0; m < r; m += 1)
          i.deps[m].rv = Ne;
      if (t !== null)
        for (const m of t)
          m.rv = Ne;
      te !== null && (n === null ? n = te : n.push(.../** @type {Source[]} */
      te));
    }
    return (e.f & Te) !== 0 && (e.f ^= Te), c;
  } catch (m) {
    return Vr(m);
  } finally {
    e.f ^= Bt, Z = t, Q = r, te = n, I = i, ne = s, Ye(a), oe = f, we = l;
  }
}
function $i(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var n = zn.call(r, e);
    if (n !== -1) {
      var i = r.length - 1;
      i === 0 ? r = t.reactions = null : (r[n] = r[i], r.pop());
    }
  }
  if (r === null && (t.f & H) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Z === null || !He.call(Z, t))) {
    var s = (
      /** @type {Derived} */
      t
    );
    (s.f & re) !== 0 && (s.f ^= re, s.f &= ~Fe), Jt(s), Li(s), ft(s, 0);
  }
}
function ft(e, t) {
  var r = e.deps;
  if (r !== null)
    for (var n = t; n < r.length; n++)
      $i(e, r[n]);
}
function We(e) {
  var t = e.f;
  if ((t & xe) === 0) {
    P(e, K);
    var r = C, n = yt;
    C = e, yt = !0;
    try {
      (t & (be | Xt)) !== 0 ? Hi(e) : lr(e), an(e);
      var i = pn(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = vn;
      var s;
    } finally {
      yt = n, C = r;
    }
  }
}
async function Wi() {
  await Promise.resolve(), wi();
}
function _(e) {
  var t = e.f, r = (t & H) !== 0;
  if (I !== null && !oe) {
    var n = C !== null && (C.f & xe) !== 0;
    if (!n && (ne === null || !He.call(ne, e))) {
      var i = I.deps;
      if ((I.f & Bt) !== 0)
        e.rv < Ne && (e.rv = Ne, Z === null && i !== null && i[Q] === e ? Q++ : Z === null ? Z = [e] : Z.push(e));
      else {
        (I.deps ??= []).push(e);
        var s = e.reactions;
        s === null ? e.reactions = [I] : He.call(s, I) || s.push(I);
      }
    }
  }
  if (Ue && Ae.has(e))
    return Ae.get(e);
  if (r) {
    var a = (
      /** @type {Derived} */
      e
    );
    if (Ue) {
      var f = a.v;
      return ((a.f & K) === 0 && a.reactions !== null || wn(a)) && (f = er(a)), Ae.set(a, f), f;
    }
    var l = (a.f & re) === 0 && !oe && I !== null && (yt || (I.f & re) !== 0), o = (a.f & Pe) === 0;
    pt(a) && (l && (a.f |= re), Gr(a)), l && !o && (Xr(a), gn(a));
  }
  if (ae?.has(e))
    return ae.get(e);
  if ((e.f & Te) !== 0)
    throw e.v;
  return e.v;
}
function gn(e) {
  if (e.f |= re, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & H) !== 0 && (t.f & re) === 0 && (Xr(
        /** @type {Derived} */
        t
      ), gn(
        /** @type {Derived} */
        t
      ));
}
function wn(e) {
  if (e.v === V) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Ae.has(t) || (t.f & H) !== 0 && wn(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function fr(e) {
  var t = oe;
  try {
    return oe = !0, e();
  } finally {
    oe = t;
  }
}
function Gi(e) {
  return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
const Xi = [
  "beforeinput",
  "click",
  "change",
  "dblclick",
  "contextmenu",
  "focusin",
  "focusout",
  "input",
  "keydown",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "pointerdown",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "touchend",
  "touchmove",
  "touchstart"
];
function Zi(e) {
  return Xi.includes(e);
}
const Ji = {
  // no `class: 'className'` because we handle that separately
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly",
  defaultvalue: "defaultValue",
  defaultchecked: "defaultChecked",
  srcobject: "srcObject",
  novalidate: "noValidate",
  allowfullscreen: "allowFullscreen",
  disablepictureinpicture: "disablePictureInPicture",
  disableremoteplayback: "disableRemotePlayback"
};
function Qi(e) {
  return e = e.toLowerCase(), Ji[e] ?? e;
}
const es = ["touchstart", "touchmove"];
function ts(e) {
  return es.includes(e);
}
const nt = Symbol("events"), bn = /* @__PURE__ */ new Set(), qt = /* @__PURE__ */ new Set();
function mn(e, t, r, n = {}) {
  function i(s) {
    if (n.capture || Yt.call(t, s), !s.cancelBubble)
      return Rt(() => r?.call(this, s));
  }
  return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? he(() => {
    t.addEventListener(e, i, n);
  }) : t.addEventListener(e, i, n), i;
}
function yn(e, t, r, n, i) {
  var s = { capture: n, passive: i }, a = mn(e, t, r, s);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && rr(() => {
    t.removeEventListener(e, a, s);
  });
}
function ze(e, t, r) {
  (t[nt] ??= {})[e] = r;
}
function Lt(e) {
  for (var t = 0; t < e.length; t++)
    bn.add(e[t]);
  for (var r of qt)
    r(e);
}
let yr = null;
function Yt(e) {
  var t = this, r = (
    /** @type {Node} */
    t.ownerDocument
  ), n = e.type, i = e.composedPath?.() || [], s = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  yr = e;
  var a = 0, f = yr === e && e[nt];
  if (f) {
    var l = i.indexOf(f);
    if (l !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[nt] = t;
      return;
    }
    var o = i.indexOf(t);
    if (o === -1)
      return;
    l <= o && (a = l);
  }
  if (s = /** @type {Element} */
  i[a] || e.target, s !== t) {
    Hn(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || r;
      }
    });
    var u = I, c = C;
    se(null), _e(null);
    try {
      for (var d, w = []; s !== null; ) {
        var g = s.assignedSlot || s.parentNode || /** @type {any} */
        s.host || null;
        try {
          var m = s[nt]?.[n];
          m != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && m.call(s, e);
        } catch (v) {
          d ? w.push(v) : d = v;
        }
        if (e.cancelBubble || g === t || g === null)
          break;
        s = g;
      }
      if (d) {
        for (let v of w)
          queueMicrotask(() => {
            throw v;
          });
        throw d;
      }
    } finally {
      e[nt] = t, delete e.currentTarget, se(u), _e(c);
    }
  }
}
const rs = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function ns(e) {
  return (
    /** @type {string} */
    rs?.createHTML(e) ?? e
  );
}
function En(e) {
  var t = Pi("template");
  return t.innerHTML = ns(e.replaceAll("<!>", "<!---->")), t.content;
}
function kn(e, t) {
  var r = (
    /** @type {Effect} */
    C
  );
  r.nodes === null && (r.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function Xe(e, t) {
  var r = (t & ci) !== 0, n, i = !e.startsWith("<!>");
  return () => {
    n === void 0 && (n = En(i ? e : "<!>" + e), n = /** @type {TemplateNode} */
    /* @__PURE__ */ kt(n));
    var s = (
      /** @type {TemplateNode} */
      r || Qr ? document.importNode(n, !0) : n.cloneNode(!0)
    );
    return kn(s, s), s;
  };
}
// @__NO_SIDE_EFFECTS__
function is(e, t, r = "svg") {
  var n = !e.startsWith("<!>"), i = `<${r}>${n ? e : "<!>" + e}</${r}>`, s;
  return () => {
    if (!s) {
      var a = (
        /** @type {DocumentFragment} */
        En(i)
      ), f = (
        /** @type {Element} */
        /* @__PURE__ */ kt(a)
      );
      s = /** @type {Element} */
      /* @__PURE__ */ kt(f);
    }
    var l = (
      /** @type {TemplateNode} */
      s.cloneNode(!0)
    );
    return kn(l, l), l;
  };
}
// @__NO_SIDE_EFFECTS__
function xn(e, t) {
  return /* @__PURE__ */ is(e, t, "svg");
}
function ke(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function ot(e, t) {
  var r = t == null ? "" : typeof t == "object" ? `${t}` : t;
  r !== (e.__t ??= e.nodeValue) && (e.__t = r, e.nodeValue = `${r}`);
}
function js(e, t) {
  return ss(e, t);
}
const bt = /* @__PURE__ */ new Map();
function ss(e, { target: t, anchor: r, props: n = {}, events: i, context: s, intro: a = !0, transformError: f }) {
  Mi();
  var l = void 0, o = Ki(() => {
    var u = r ?? t.appendChild(Me());
    Ei(
      /** @type {TemplateNode} */
      u,
      {
        pending: () => {
        }
      },
      (w) => {
        ht({});
        var g = (
          /** @type {ComponentContext} */
          ie
        );
        s && (g.c = s), i && (n.$$events = i), l = e(w, n) || {}, _t();
      },
      f
    );
    var c = /* @__PURE__ */ new Set(), d = (w) => {
      for (var g = 0; g < w.length; g++) {
        var m = w[g];
        if (!c.has(m)) {
          c.add(m);
          var v = ts(m);
          for (const k of [t, document]) {
            var p = bt.get(k);
            p === void 0 && (p = /* @__PURE__ */ new Map(), bt.set(k, p));
            var F = p.get(m);
            F === void 0 ? (k.addEventListener(m, Yt, { passive: v }), p.set(m, 1)) : p.set(m, F + 1);
          }
        }
      }
    };
    return d(It(bn)), qt.add(d), () => {
      for (var w of c)
        for (const v of [t, document]) {
          var g = (
            /** @type {Map<string, number>} */
            bt.get(v)
          ), m = (
            /** @type {number} */
            g.get(w)
          );
          --m == 0 ? (v.removeEventListener(w, Yt), g.delete(w), g.size === 0 && bt.delete(v)) : g.set(w, m);
        }
      qt.delete(d), u !== r && u.parentNode?.removeChild(u);
    };
  });
  return ls.set(l, o), l;
}
let ls = /* @__PURE__ */ new WeakMap();
class as {
  /** @type {TemplateNode} */
  anchor;
  /** @type {Map<Batch, Key>} */
  #t = /* @__PURE__ */ new Map();
  /**
   * Map of keys to effects that are currently rendered in the DOM.
   * These effects are visible and actively part of the document tree.
   * Example:
   * ```
   * {#if condition}
   * 	foo
   * {:else}
   * 	bar
   * {/if}
   * ```
   * Can result in the entries `true->Effect` and `false->Effect`
   * @type {Map<Key, Effect>}
   */
  #r = /* @__PURE__ */ new Map();
  /**
   * Similar to #onscreen with respect to the keys, but contains branches that are not yet
   * in the DOM, because their insertion is deferred.
   * @type {Map<Key, Branch>}
   */
  #e = /* @__PURE__ */ new Map();
  /**
   * Keys of effects that are currently outroing
   * @type {Set<Key>}
   */
  #a = /* @__PURE__ */ new Set();
  /**
   * Whether to pause (i.e. outro) on change, or destroy immediately.
   * This is necessary for `<svelte:element>`
   */
  #n = !0;
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, r = !0) {
    this.anchor = t, this.#n = r;
  }
  #s = () => {
    var t = (
      /** @type {Batch} */
      N
    );
    if (this.#t.has(t)) {
      var r = (
        /** @type {Key} */
        this.#t.get(t)
      ), n = this.#r.get(r);
      if (n)
        ar(n), this.#a.delete(r);
      else {
        var i = this.#e.get(r);
        i && (this.#r.set(r, i.effect), this.#e.delete(r), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), n = i.effect);
      }
      for (const [s, a] of this.#t) {
        if (this.#t.delete(s), s === t)
          break;
        const f = this.#e.get(a);
        f && (z(f.effect), this.#e.delete(a));
      }
      for (const [s, a] of this.#r) {
        if (s === r || this.#a.has(s)) continue;
        const f = () => {
          if (Array.from(this.#t.values()).includes(s)) {
            var o = document.createDocumentFragment();
            cn(a, o), o.append(Me()), this.#e.set(s, { effect: a, fragment: o });
          } else
            z(a);
          this.#a.delete(s), this.#r.delete(s);
        };
        this.#n || !n ? (this.#a.add(s), De(a, f, !1)) : f();
      }
    }
  };
  /**
   * @param {Batch} batch
   */
  #i = (t) => {
    this.#t.delete(t);
    const r = Array.from(this.#t.values());
    for (const [n, i] of this.#e)
      r.includes(n) || (z(i.effect), this.#e.delete(n));
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, r) {
    var n = (
      /** @type {Batch} */
      N
    ), i = rn();
    if (r && !this.#r.has(t) && !this.#e.has(t))
      if (i) {
        var s = document.createDocumentFragment(), a = Me();
        s.append(a), this.#e.set(t, {
          effect: J(() => r(a)),
          fragment: s
        });
      } else
        this.#r.set(
          t,
          J(() => r(this.anchor))
        );
    if (this.#t.set(n, t), i) {
      for (const [f, l] of this.#r)
        f === t ? n.unskip_effect(l) : n.skip_effect(l);
      for (const [f, l] of this.#e)
        f === t ? n.unskip_effect(l.effect) : n.skip_effect(l.effect);
      n.oncommit(this.#s), n.ondiscard(this.#i);
    } else
      this.#s();
  }
}
function Er(e, t, r = !1) {
  var n = new as(e), i = r ? qe : 0;
  function s(a, f) {
    n.ensure(a, f);
  }
  sr(() => {
    var a = !1;
    t((f, l = 0) => {
      a = !0, s(l, f);
    }), a || s(!1, null);
  }, i);
}
function fs(e, t, r) {
  for (var n = [], i = t.length, s, a = t.length, f = 0; f < i; f++) {
    let c = t[f];
    De(
      c,
      () => {
        if (s) {
          if (s.pending.delete(c), s.done.add(c), s.pending.size === 0) {
            var d = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            $t(It(s.done)), d.delete(s), d.size === 0 && (e.outrogroups = null);
          }
        } else
          a -= 1;
      },
      !1
    );
  }
  if (a === 0) {
    var l = n.length === 0 && r !== null;
    if (l) {
      var o = (
        /** @type {Element} */
        r
      ), u = (
        /** @type {Element} */
        o.parentNode
      );
      Di(u), u.append(o), e.items.clear();
    }
    $t(t, !l);
  } else
    s = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(s);
}
function $t(e, t = !0) {
  for (var r = 0; r < e.length; r++)
    z(e[r], t);
}
var kr;
function Ot(e, t, r, n, i, s = null) {
  var a = e, f = /* @__PURE__ */ new Map(), l = (t & Dr) !== 0;
  if (l) {
    var o = (
      /** @type {Element} */
      e
    );
    a = o.appendChild(Me());
  }
  var u = null, c = /* @__PURE__ */ Ai(() => {
    var p = r();
    return Gt(p) ? p : p == null ? [] : It(p);
  }), d, w = !0;
  function g() {
    v.fallback = u, os(v, d, a, t, n), u !== null && (d.length === 0 ? (u.f & ge) === 0 ? ar(u) : (u.f ^= ge, it(u, null, a)) : De(u, () => {
      u = null;
    }));
  }
  var m = sr(() => {
    d = /** @type {V[]} */
    _(c);
    for (var p = d.length, F = /* @__PURE__ */ new Set(), k = (
      /** @type {Batch} */
      N
    ), x = rn(), S = 0; S < p; S += 1) {
      var j = d[S], O = n(j, S), U = w ? null : f.get(O);
      U ? (U.v && $e(U.v, j), U.i && $e(U.i, S), x && k.unskip_effect(U.e)) : (U = us(
        f,
        w ? a : kr ??= Me(),
        j,
        O,
        S,
        i,
        t,
        r
      ), w || (U.e.f |= ge), f.set(O, U)), F.add(O);
    }
    if (p === 0 && s && !u && (w ? u = J(() => s(a)) : (u = J(() => s(kr ??= Me())), u.f |= ge)), p > F.size && Jn(), !w)
      if (x) {
        for (const [q, W] of f)
          F.has(q) || k.skip_effect(W.e);
        k.oncommit(g), k.ondiscard(() => {
        });
      } else
        g();
    _(c);
  }), v = { effect: m, items: f, outrogroups: null, fallback: u };
  w = !1;
}
function Je(e) {
  for (; e !== null && (e.f & ce) === 0; )
    e = e.next;
  return e;
}
function os(e, t, r, n, i) {
  var s = (n & oi) !== 0, a = t.length, f = e.items, l = Je(e.effect.first), o, u = null, c, d = [], w = [], g, m, v, p;
  if (s)
    for (p = 0; p < a; p += 1)
      g = t[p], m = i(g, p), v = /** @type {EachItem} */
      f.get(m).e, (v.f & ge) === 0 && (v.nodes?.a?.measure(), (c ??= /* @__PURE__ */ new Set()).add(v));
  for (p = 0; p < a; p += 1) {
    if (g = t[p], m = i(g, p), v = /** @type {EachItem} */
    f.get(m).e, e.outrogroups !== null)
      for (const W of e.outrogroups)
        W.pending.delete(v), W.done.delete(v);
    if ((v.f & ge) !== 0)
      if (v.f ^= ge, v === l)
        it(v, null, r);
      else {
        var F = u ? u.next : l;
        v === e.effect.last && (e.effect.last = v.prev), v.prev && (v.prev.next = v.next), v.next && (v.next.prev = v.prev), me(e, u, v), me(e, v, F), it(v, F, r), u = v, d = [], w = [], l = Je(u.next);
        continue;
      }
    if ((v.f & ee) !== 0 && (ar(v), s && (v.nodes?.a?.unfix(), (c ??= /* @__PURE__ */ new Set()).delete(v))), v !== l) {
      if (o !== void 0 && o.has(v)) {
        if (d.length < w.length) {
          var k = w[0], x;
          u = k.prev;
          var S = d[0], j = d[d.length - 1];
          for (x = 0; x < d.length; x += 1)
            it(d[x], k, r);
          for (x = 0; x < w.length; x += 1)
            o.delete(w[x]);
          me(e, S.prev, j.next), me(e, u, S), me(e, j, k), l = k, u = j, p -= 1, d = [], w = [];
        } else
          o.delete(v), it(v, l, r), me(e, v.prev, v.next), me(e, v, u === null ? e.effect.first : u.next), me(e, u, v), u = v;
        continue;
      }
      for (d = [], w = []; l !== null && l !== v; )
        (o ??= /* @__PURE__ */ new Set()).add(l), w.push(l), l = Je(l.next);
      if (l === null)
        continue;
    }
    (v.f & ge) === 0 && d.push(v), u = v, l = Je(v.next);
  }
  if (e.outrogroups !== null) {
    for (const W of e.outrogroups)
      W.pending.size === 0 && ($t(It(W.done)), e.outrogroups?.delete(W));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (l !== null || o !== void 0) {
    var O = [];
    if (o !== void 0)
      for (v of o)
        (v.f & ee) === 0 && O.push(v);
    for (; l !== null; )
      (l.f & ee) === 0 && l !== e.fallback && O.push(l), l = Je(l.next);
    var U = O.length;
    if (U > 0) {
      var q = (n & Dr) !== 0 && a === 0 ? r : null;
      if (s) {
        for (p = 0; p < U; p += 1)
          O[p].nodes?.a?.measure();
        for (p = 0; p < U; p += 1)
          O[p].nodes?.a?.fix();
      }
      fs(e, O, q);
    }
  }
  s && he(() => {
    if (c !== void 0)
      for (v of c)
        v.nodes?.a?.apply();
  });
}
function us(e, t, r, n, i, s, a, f) {
  var l = (a & ai) !== 0 ? (a & ui) === 0 ? /* @__PURE__ */ Oi(r, !1, !1) : Re(r) : null, o = (a & fi) !== 0 ? Re(i) : null;
  return {
    v: l,
    i: o,
    e: J(() => (s(t, l ?? r, o ?? i, f), () => {
      e.delete(n);
    }))
  };
}
function it(e, t, r) {
  if (e.nodes)
    for (var n = e.nodes.start, i = e.nodes.end, s = t && (t.f & ge) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : r; n !== null; ) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ St(n)
      );
      if (s.before(n), n === i)
        return;
      n = a;
    }
}
function me(e, t, r) {
  t === null ? e.effect.first = r : t.next = r, r === null ? e.effect.last = t : r.prev = t;
}
function cs(e, t) {
  var r = void 0, n;
  ln(() => {
    r !== (r = t()) && (n && (z(n), n = null), r && (n = J(() => {
      nr(() => (
        /** @type {(node: Element) => void} */
        r(e)
      ));
    })));
  });
}
function Tn(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (r = Tn(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function ds() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++) (e = arguments[r]) && (t = Tn(e)) && (n && (n += " "), n += t);
  return n;
}
function vs(e) {
  return typeof e == "object" ? ds(e) : e ?? "";
}
const xr = [...` 	
\r\f \v\uFEFF`];
function hs(e, t, r) {
  var n = e == null ? "" : "" + e;
  if (r) {
    for (var i of Object.keys(r))
      if (r[i])
        n = n ? n + " " + i : i;
      else if (n.length)
        for (var s = i.length, a = 0; (a = n.indexOf(i, a)) >= 0; ) {
          var f = a + s;
          (a === 0 || xr.includes(n[a - 1])) && (f === n.length || xr.includes(n[f])) ? n = (a === 0 ? "" : n.substring(0, a)) + n.substring(f + 1) : a = f;
        }
  }
  return n === "" ? null : n;
}
function Tr(e, t = !1) {
  var r = t ? " !important;" : ";", n = "";
  for (var i of Object.keys(e)) {
    var s = e[i];
    s != null && s !== "" && (n += " " + i + ": " + s + r);
  }
  return n;
}
function Ct(e) {
  return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function _s(e, t) {
  if (t) {
    var r = "", n, i;
    if (Array.isArray(t) ? (n = t[0], i = t[1]) : n = t, e) {
      e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var s = !1, a = 0, f = !1, l = [];
      n && l.push(...Object.keys(n).map(Ct)), i && l.push(...Object.keys(i).map(Ct));
      var o = 0, u = -1;
      const m = e.length;
      for (var c = 0; c < m; c++) {
        var d = e[c];
        if (f ? d === "/" && e[c - 1] === "*" && (f = !1) : s ? s === d && (s = !1) : d === "/" && e[c + 1] === "*" ? f = !0 : d === '"' || d === "'" ? s = d : d === "(" ? a++ : d === ")" && a--, !f && s === !1 && a === 0) {
          if (d === ":" && u === -1)
            u = c;
          else if (d === ";" || c === m - 1) {
            if (u !== -1) {
              var w = Ct(e.substring(o, u).trim());
              if (!l.includes(w)) {
                d !== ";" && c++;
                var g = e.substring(o, c).trim();
                r += " " + g + ";";
              }
            }
            o = c + 1, u = -1;
          }
        }
      }
    }
    return n && (r += Tr(n)), i && (r += Tr(i, !0)), r = r.trim(), r === "" ? null : r;
  }
  return e == null ? null : String(e);
}
function In(e, t, r, n, i, s) {
  var a = e.__className;
  if (a !== r || a === void 0) {
    var f = hs(r, n, s);
    f == null ? e.removeAttribute("class") : t ? e.className = f : e.setAttribute("class", f), e.__className = r;
  } else if (s && i !== s)
    for (var l in s) {
      var o = !!s[l];
      (i == null || o !== !!i[l]) && e.classList.toggle(l, o);
    }
  return s;
}
function Nt(e, t = {}, r, n) {
  for (var i in r) {
    var s = r[i];
    t[i] !== s && (r[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, s, n));
  }
}
function ps(e, t, r, n) {
  var i = e.__style;
  if (i !== t) {
    var s = _s(t, n);
    s == null ? e.removeAttribute("style") : e.style.cssText = s, e.__style = t;
  } else n && (Array.isArray(n) ? (Nt(e, r?.[0], n[0]), Nt(e, r?.[1], n[1], "important")) : Nt(e, r, n));
  return n;
}
function Wt(e, t, r = !1) {
  if (e.multiple) {
    if (t == null)
      return;
    if (!Gt(t))
      return vi();
    for (var n of e.options)
      n.selected = t.includes(Ir(n));
    return;
  }
  for (n of e.options) {
    var i = Ir(n);
    if (Ni(i, t)) {
      n.selected = !0;
      return;
    }
  }
  (!r || t !== void 0) && (e.selectedIndex = -1);
}
function gs(e) {
  var t = new MutationObserver(() => {
    Wt(e, e.__value);
  });
  t.observe(e, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), rr(() => {
    t.disconnect();
  });
}
function Ir(e) {
  return "__value" in e ? e.__value : e.value;
}
const Qe = Symbol("class"), et = Symbol("style"), An = Symbol("is custom element"), Sn = Symbol("is html"), ws = Mr ? "option" : "OPTION", bs = Mr ? "select" : "SELECT";
function ms(e, t) {
  t ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function ut(e, t, r, n) {
  var i = Ln(e);
  i[t] !== (i[t] = r) && (t === "loading" && (e[Xn] = r), r == null ? e.removeAttribute(t) : typeof r != "string" && On(e).includes(t) ? e[t] = r : e.setAttribute(t, r));
}
function ys(e, t, r, n, i = !1, s = !1) {
  var a = Ln(e), f = a[An], l = !a[Sn], o = t || {}, u = e.nodeName === ws;
  for (var c in t)
    c in r || (r[c] = null);
  r.class ? r.class = vs(r.class) : r[Qe] && (r.class = null), r[et] && (r.style ??= null);
  var d = On(e);
  for (const k in r) {
    let x = r[k];
    if (u && k === "value" && x == null) {
      e.value = e.__value = "", o[k] = x;
      continue;
    }
    if (k === "class") {
      var w = e.namespaceURI === "http://www.w3.org/1999/xhtml";
      In(e, w, x, n, t?.[Qe], r[Qe]), o[k] = x, o[Qe] = r[Qe];
      continue;
    }
    if (k === "style") {
      ps(e, x, t?.[et], r[et]), o[k] = x, o[et] = r[et];
      continue;
    }
    var g = o[k];
    if (!(x === g && !(x === void 0 && e.hasAttribute(k)))) {
      o[k] = x;
      var m = k[0] + k[1];
      if (m !== "$$")
        if (m === "on") {
          const S = {}, j = "$$" + k;
          let O = k.slice(2);
          var v = Zi(O);
          if (Gi(O) && (O = O.slice(0, -7), S.capture = !0), !v && g) {
            if (x != null) continue;
            e.removeEventListener(O, o[j], S), o[j] = null;
          }
          if (v)
            ze(O, e, x), Lt([O]);
          else if (x != null) {
            let U = function(q) {
              o[k].call(this, q);
            };
            o[j] = mn(O, e, U, S);
          }
        } else if (k === "style")
          ut(e, k, x);
        else if (k === "autofocus")
          Fi(
            /** @type {HTMLElement} */
            e,
            !!x
          );
        else if (!f && (k === "__value" || k === "value" && x != null))
          e.value = e.__value = x;
        else if (k === "selected" && u)
          ms(
            /** @type {HTMLOptionElement} */
            e,
            x
          );
        else {
          var p = k;
          l || (p = Qi(p));
          var F = p === "defaultValue" || p === "defaultChecked";
          if (x == null && !f && !F)
            if (a[k] = null, p === "value" || p === "checked") {
              let S = (
                /** @type {HTMLInputElement} */
                e
              );
              const j = t === void 0;
              if (p === "value") {
                let O = S.defaultValue;
                S.removeAttribute(p), S.defaultValue = O, S.value = S.__value = j ? O : null;
              } else {
                let O = S.defaultChecked;
                S.removeAttribute(p), S.defaultChecked = O, S.checked = j ? O : !1;
              }
            } else
              e.removeAttribute(k);
          else F || d.includes(p) && (f || typeof x != "string") ? (e[p] = x, p in a && (a[p] = V)) : typeof x != "function" && ut(e, p, x);
        }
    }
  }
  return o;
}
function Rn(e, t, r = [], n = [], i = [], s, a = !1, f = !1) {
  Wr(i, r, n, (l) => {
    var o = void 0, u = {}, c = e.nodeName === bs, d = !1;
    if (ln(() => {
      var g = t(...l.map(_)), m = ys(
        e,
        o,
        g,
        s,
        a,
        f
      );
      d && c && "value" in g && Wt(
        /** @type {HTMLSelectElement} */
        e,
        g.value
      );
      for (let p of Object.getOwnPropertySymbols(u))
        g[p] || z(u[p]);
      for (let p of Object.getOwnPropertySymbols(g)) {
        var v = g[p];
        p.description === di && (!o || v !== o[p]) && (u[p] && z(u[p]), u[p] = J(() => cs(e, () => v))), m[p] = v;
      }
      o = m;
    }), c) {
      var w = (
        /** @type {HTMLSelectElement} */
        e
      );
      nr(() => {
        Wt(
          w,
          /** @type {Record<string | symbol, any>} */
          o.value,
          !0
        ), gs(w);
      });
    }
    d = !0;
  });
}
function Ln(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [An]: e.nodeName.includes("-"),
      [Sn]: e.namespaceURI === Pr
    }
  );
}
var Ar = /* @__PURE__ */ new Map();
function On(e) {
  var t = e.getAttribute("is") || e.nodeName, r = Ar.get(t);
  if (r) return r;
  Ar.set(t, r = []);
  for (var n, i = e, s = Element.prototype; s !== i; ) {
    n = qn(i);
    for (var a in n)
      n[a].set && r.push(a);
    i = Lr(i);
  }
  return r;
}
function Es(e, t, r = t) {
  var n = /* @__PURE__ */ new WeakSet();
  Bi(e, "input", async (i) => {
    var s = i ? e.defaultValue : e.value;
    if (s = Mt(e) ? Dt(s) : s, r(s), N !== null && n.add(N), await Wi(), s !== (s = t())) {
      var a = e.selectionStart, f = e.selectionEnd, l = e.value.length;
      if (e.value = s ?? "", f !== null) {
        var o = e.value.length;
        a === f && f === l && o > l ? (e.selectionStart = o, e.selectionEnd = o) : (e.selectionStart = a, e.selectionEnd = Math.min(f, o));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  fr(t) == null && e.value && (r(Mt(e) ? Dt(e.value) : e.value), N !== null && n.add(N)), ir(() => {
    var i = t();
    if (e === document.activeElement) {
      var s = (
        /** @type {Batch} */
        jt ?? N
      );
      if (n.has(s))
        return;
    }
    Mt(e) && i === Dt(e.value) || e.type === "date" && !i && !e.value || i !== e.value && (e.value = i ?? "");
  });
}
function Mt(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function Dt(e) {
  return e === "" ? null : +e;
}
function Sr(e, t) {
  return e === t || e?.[Ke] === t;
}
function Tt(e = {}, t, r, n) {
  return nr(() => {
    var i, s;
    return ir(() => {
      i = s, s = [], fr(() => {
        e !== r(...s) && (t(e, ...s), i && Sr(r(...i), e) && t(null, ...i));
      });
    }), () => {
      he(() => {
        s && Sr(r(...s), e) && t(null, ...s);
      });
    };
  }), e;
}
const ks = {
  get(e, t) {
    if (!e.exclude.includes(t))
      return e.props[t];
  },
  set(e, t) {
    return !1;
  },
  getOwnPropertyDescriptor(e, t) {
    if (!e.exclude.includes(t) && t in e.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: e.props[t]
      };
  },
  has(e, t) {
    return e.exclude.includes(t) ? !1 : t in e.props;
  },
  ownKeys(e) {
    return Reflect.ownKeys(e.props).filter((t) => !e.exclude.includes(t));
  }
};
// @__NO_SIDE_EFFECTS__
function Cn(e, t, r) {
  return new Proxy(
    { props: e, exclude: t },
    ks
  );
}
function Ve(e, t, r, n) {
  var i = (
    /** @type {V} */
    n
  ), s = !0, a = () => (s && (s = !1, i = /** @type {V} */
  n), i), f;
  f = /** @type {V} */
  e[t], f === void 0 && n !== void 0 && (f = a());
  var l;
  return l = () => {
    var o = (
      /** @type {V} */
      e[t]
    );
    return o === void 0 ? a() : (s = !0, o);
  }, l;
}
const xs = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(xs);
const Et = {
  close() {
    setTimeout(() => {
      close();
    }, 500);
  },
  reg: {
    createSearch(e, t) {
      var r = /[-\/\\^$*+?.()|[\]{}]/, n = "";
      for (let i = 0; i < e.length; i++) {
        let s = e[i];
        if (r.test(s) ? n += `\\${s}` : n += s, i < e.length - 1) {
          let a = e[i + 1];
          r.test(a) && (a = `\\${a}`), n += `[^${a}]*`;
        }
      }
      return new RegExp(n, t);
    }
  }
}, mt = {
  getAll() {
    return chrome.windows.getAll();
  },
  getCurrent() {
    return chrome.windows.getCurrent();
  },
  activate(e) {
    return chrome.windows.update(e, { focused: !0 });
  }
}, Pt = {
  async getAll() {
    const e = await chrome.bookmarks.getTree();
    var t = [], r = (n, i) => {
      if (n.bookmarkTreeNode?.children) {
        var s = n.title === "";
        n.bookmarkTreeNode.children.forEach((a) => {
          let f = {
            id: a.id,
            title: a.title || "",
            url: a.url || "",
            bookmarkTreeNode: a
          }, l = "";
          i ? l = a.title.replace(/\//g, "") : (l = n.path || "", l += "/" + a.title.replace(/\//g, "")), f.path = l.replace(/^\//g, ""), r(f, s);
        });
      } else
        n.type = "bookmark", /^javascript\:/.test(n.url) ? (n.isBookmarklet = !0, n.script = n.url, n.url = "bookmarklet") : n.favIconUrl = Nn(n.url), t.push(n);
    };
    return e.forEach((n) => r({
      id: n.id,
      title: n.title,
      url: n.url || "",
      bookmarkTreeNode: n
    }, !0)), t;
  }
}, ye = {
  get(e) {
    return chrome.tabs.get(e);
  },
  getAll(e) {
    return chrome.tabs.query({ windowId: e });
  },
  async getCurrent() {
    return (await chrome.tabs.query({
      windowId: chrome.windows.WINDOW_ID_CURRENT,
      active: !0
    }))[0];
  },
  // TODO: サブドメインで分割、優先順位を考慮する (オプションページで設定)
  async sort(e = !1) {
    var t = e ? 1 : -1;
    return await new Promise(async (r) => {
      var n = [];
      for (const s of await mt.getAll()) {
        var i = await ye.getAll(s.id);
        i = await new Promise(
          (a) => chrome.tabs.move(
            i.sort((f, l) => (f.url || "") < (l.url || "") ? t : -t).map((f) => f.id || 0),
            { index: -1 },
            (f) => a(f)
          )
        ), n = n.concat(i);
      }
      r(n);
    });
  },
  async getAllByAllWindow() {
    const e = await mt.getAll();
    return (await Promise.all(e.map((r) => ye.getAll(r.id)))).flat();
  },
  async activate(e) {
    return (await mt.getCurrent()).id !== e.windowId && await mt.activate(e.windowId), chrome.tabs.update(e.id, { active: !0 });
  }
}, tt = {
  get(e) {
    return new Promise((t) => chrome.storage.local.get(e, (r) => t(typeof e == "string" ? r[e] : r)));
  },
  set(e) {
    return chrome.storage.local.set(e);
  }
}, Vs = {
  STORAGE_KEY: "util_tabHistory",
  LOCK_STORAGE_KEY: "util_tabHistory_lock",
  _history: [],
  _historyIndex: 0,
  async load() {
    var e = await tt.get(this.STORAGE_KEY);
    Object.assign(this, e);
  },
  save() {
    return tt.set({
      [this.STORAGE_KEY]: {
        _history: this._history,
        _historyIndex: this._historyIndex
      }
    });
  },
  // 履歴内に同じタブがある場合はそのタブを消してから push
  push(e) {
    this._historyIndex !== 0 && (this._history = this._history.slice(0, this._history.length - this._historyIndex));
    var t = this._history.findIndex((r) => r === e.tabId);
    t !== -1 && this._history.splice(t, 1), this._history.push(e.tabId), this._historyIndex = 0;
  },
  // 現在のタブを取得
  get current() {
    return this._history[this._history.length - this._historyIndex - 1];
  },
  // カウンターを進めて取得
  back() {
    return this._historyIndex = Math.min(this._history.length - 1, this._historyIndex + 1), this.current;
  },
  // カウンターを戻して取得
  forward() {
    return this._historyIndex = Math.max(0, this._historyIndex - 1), this.current;
  },
  lock() {
    return tt.set({ [this.LOCK_STORAGE_KEY]: !0 });
  },
  unlock() {
    return tt.set({ [this.LOCK_STORAGE_KEY]: !1 });
  },
  isLocked() {
    return tt.get(this.LOCK_STORAGE_KEY);
  },
  isFirst() {
    return this._historyIndex >= this._history.length - 1;
  },
  isLast() {
    return this._historyIndex <= 0;
  }
};
function Ts(e, t) {
  let r;
  return Object.assign((...n) => {
    clearTimeout(r), r = setTimeout(() => e(...n), t);
  }, {
    cancel: () => clearTimeout(r)
  });
}
const Ft = {
  async getAll() {
    const e = await chrome.readingList.query({}), t = (i) => ({
      id: i.url,
      title: i.title,
      url: i.url,
      favIconUrl: Nn(i.url),
      type: "readingList",
      hasBeenRead: i.hasBeenRead
    }), r = e.filter((i) => !i.hasBeenRead).sort((i, s) => s.creationTime - i.creationTime), n = e.filter((i) => i.hasBeenRead).sort((i, s) => s.creationTime - i.creationTime).slice(0, 30);
    return [...r, ...n].map(t);
  },
  remove(e) {
    return chrome.readingList.removeEntry({ url: e });
  },
  toggleRead(e, t) {
    return chrome.readingList.updateEntry({ url: e, hasBeenRead: t });
  }
};
function Nn(e) {
  const t = new URL(chrome.runtime.getURL("/_favicon/"));
  return t.searchParams.set("pageUrl", e), t.searchParams.set("size", "32"), t.toString();
}
var Is = ["forEach", "isDisjointFrom", "isSubsetOf", "isSupersetOf"], As = ["difference", "intersection", "symmetricDifference", "union"], Rr = !1;
class ct extends Set {
  /** @type {Map<T, Source<boolean>>} */
  #t = /* @__PURE__ */ new Map();
  #r = /* @__PURE__ */ M(0);
  #e = /* @__PURE__ */ M(0);
  #a = we || -1;
  /**
   * @param {Iterable<T> | null | undefined} [value]
   */
  constructor(t) {
    if (super(), t) {
      for (var r of t)
        super.add(r);
      this.#e.v = super.size;
    }
    Rr || this.#s();
  }
  /**
   * If the source is being created inside the same reaction as the SvelteSet instance,
   * we use `state` so that it will not be a dependency of the reaction. Otherwise we
   * use `source` so it will be.
   *
   * @template T
   * @param {T} value
   * @returns {Source<T>}
   */
  #n(t) {
    return we === this.#a ? /* @__PURE__ */ M(t) : Re(t);
  }
  // We init as part of the first instance so that we can treeshake this class
  #s() {
    Rr = !0;
    var t = ct.prototype, r = Set.prototype;
    for (const n of Is)
      t[n] = function(...i) {
        return _(this.#r), r[n].apply(this, i);
      };
    for (const n of As)
      t[n] = function(...i) {
        _(this.#r);
        var s = (
          /** @type {Set<T>} */
          r[n].apply(this, i)
        );
        return new ct(s);
      };
  }
  /** @param {T} value */
  has(t) {
    var r = super.has(t), n = this.#t, i = n.get(t);
    if (i === void 0) {
      if (!r)
        return _(this.#r), !1;
      i = this.#n(!0), n.set(t, i);
    }
    return _(i), r;
  }
  /** @param {T} value */
  add(t) {
    return super.has(t) || (super.add(t), T(this.#e, super.size), Se(this.#r)), this;
  }
  /** @param {T} value */
  delete(t) {
    var r = super.delete(t), n = this.#t, i = n.get(t);
    return i !== void 0 && (n.delete(t), T(i, !1)), r && (T(this.#e, super.size), Se(this.#r)), r;
  }
  clear() {
    if (super.size !== 0) {
      super.clear();
      var t = this.#t;
      for (var r of t.values())
        T(r, !1);
      t.clear(), T(this.#e, 0), Se(this.#r);
    }
  }
  keys() {
    return this.values();
  }
  values() {
    return _(this.#r), super.values();
  }
  entries() {
    return _(this.#r), super.entries();
  }
  [Symbol.iterator]() {
    return this.keys();
  }
  get size() {
    return _(this.#e);
  }
}
var Ss = /* @__PURE__ */ Xe('<button><div class="mr4 flex-fixed s20 f fh bg-white rounded-4"><img class="object-fit-cover s16" alt=""/></div> <div><div class="line-clamp-2 word-break-all white-space-pre-wrap w-full fs12 lh12"> </div></div></button>');
function Rs(e, t) {
  ht(t, !0);
  let r = Ve(t, "selected", 3, !1), n = /* @__PURE__ */ Cn(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "favIconUrl",
    "name",
    "selected"
  ]), i = /* @__PURE__ */ M(void 0), s = !1;
  xt(() => {
    !s && r() && _(i)?.scrollIntoView({ block: "nearest", inline: "nearest" }), s = r();
  });
  var a = Ss();
  Rn(a, () => ({
    class: `f fm w-full text-left p4 border-bottom cursor-pointer ${r() ? "bg-link text-white" : "hover-bg-primary hover-text-white"}`,
    type: "button",
    ...n
  }));
  var f = B(a), l = B(f), o = ve(f, 2), u = B(o), c = B(u);
  Tt(a, (d) => T(i, d), () => _(i)), at(() => {
    ut(l, "src", t.favIconUrl), ot(c, t.name);
  }), ke(e, a), _t();
}
var Ls = /* @__PURE__ */ xn('<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" fill="#999" stroke="#999" stroke-width="2"></circle><polyline points="7 12.5 10.5 16 17 9" fill="none" stroke="white" stroke-width="2.2"></polyline></svg>'), Os = /* @__PURE__ */ xn('<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"></circle><polyline points="7 12.5 10.5 16 17 9" fill="none" stroke="currentColor" stroke-width="2.2"></polyline></svg>'), Cs = /* @__PURE__ */ Xe('<div class="flex-fixed ml-auto pl6 f fh" role="button" tabindex="0"><!></div>'), Ns = /* @__PURE__ */ Xe('<button><div class="mr4 flex-fixed s24 f fh bg-white rounded-4"><img class="object-fit-cover s20" alt=""/></div> <div class="f-1 overflow-hidden"><div class="line-clamp-1 word-break-all white-space-pre-wrap w-full fs12 lh12"> </div> <div> </div></div> <!></button>');
function Ms(e, t) {
  ht(t, !0);
  let r = Ve(t, "selected", 3, !1), n = Ve(t, "favIconUrl", 3, ""), i = Ve(t, "title", 3, ""), s = Ve(t, "hasBeenRead", 3, !1), a = Ve(t, "isReadingList", 3, !1), f = /* @__PURE__ */ Cn(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "class",
    "selected",
    "favIconUrl",
    "title",
    "url",
    "hasBeenRead",
    "isReadingList",
    "onToggleRead"
  ]), l = /* @__PURE__ */ M(void 0), o = !1;
  xt(() => {
    !o && r() && _(l)?.scrollIntoView({ block: "nearest", inline: "nearest" }), o = r();
  });
  var u = Ns();
  Rn(u, () => ({
    class: `${t.class ?? ""} f fm w-full p4 border-bottom cursor-pointer text-left ${r() ? "bg-link text-white" : "hover-bg-primary hover-text-white"}`,
    type: "button",
    ...f
  }));
  var c = B(u), d = B(c), w = ve(c, 2), g = B(w), m = B(g), v = ve(g, 2), p = B(v), F = ve(w, 2);
  {
    var k = (x) => {
      var S = Cs(), j = B(S);
      {
        var O = (q) => {
          var W = Ls();
          ke(q, W);
        }, U = (q) => {
          var W = Os();
          ke(q, W);
        };
        Er(j, (q) => {
          s() ? q(O) : q(U, !1);
        });
      }
      at(() => ut(S, "title", s() ? "既読" : "未読")), ze("click", S, (q) => {
        q.stopPropagation(), t.onToggleRead?.();
      }), ke(x, S);
    };
    Er(F, (x) => {
      a() && x(k);
    });
  }
  Tt(u, (x) => T(l, x), () => _(l)), at(() => {
    ut(d, "src", n()), ot(m, i()), In(v, 1, `line-clamp-1 word-break-all white-space-pre-wrap w-full fs10 parent-hover-text-white lh12 ${r() ? "text-white" : "text-weak"}`), ot(p, t.url);
  }), ke(e, u), _t();
}
Lt(["click"]);
var Ds = /* @__PURE__ */ Xe('<div><div class="bg-whitesmoke border-bottom w-full py8 px6 fs12 flex-fixed"> </div> <!></div>'), Ps = /* @__PURE__ */ Xe('<form class="f flex-column s-full"><input class="input w-full fs12 flex-fixed letter-spacing-1" type="search"/> <div tabindex="-1" class="outline-none f w-full overflow-hidden"><div class="flex-fixed w200 h-full f flex-column border-right"><div class="bg-lightgray w-full p6 fs12 text-center flex-fixed">Shift + ↓↑</div> <div class="s-full overflow-scroll"></div></div> <div class="s-full f flex-column"><div class="bg-lightgray w-full p6 fs12 text-center flex-fixed"> </div> <div class="overflow-scroll s-full"></div></div></div></form>');
function Fs(e, t) {
  ht(t, !0);
  let r = null, n = /* @__PURE__ */ M(null), i = /* @__PURE__ */ M(void 0), s = /* @__PURE__ */ M(void 0), a = /* @__PURE__ */ M(""), f = /* @__PURE__ */ M([]), l = /* @__PURE__ */ M(0), o = /* @__PURE__ */ M(!1), u = /* @__PURE__ */ M(!1), c = !1, d = 0, w = null;
  const g = new ct(), m = new ct();
  let v = /* @__PURE__ */ M("normal");
  const p = /* @__PURE__ */ Le(() => ({
    normal: "タブ",
    bookmark: "ブックマーク",
    bookmarklet: "ブックマークレット",
    readingList: "リーディングリスト"
  })[_(v)]);
  Vi(() => {
    var h = null;
    T(n, null), r = null, _(f)?.some((E) => E.tabs.some((R) => {
      var L = R.__index === _(l);
      return L && (h = R, T(n, E)), L;
    })), h && (r = h);
  }), xt(() => {
    _(i)?.focus(), S();
  }), xt(() => {
    _(u) && (_(o) || r && U(r));
  });
  function F(h) {
    h.preventDefault(), T(u, !0);
  }
  function k(h, E) {
    if (!E) return [h];
    var R = E.toLowerCase(), L = Et.reg.createSearch(E, "i"), A = [], Y = [];
    return h.forEach((y) => {
      var b = y.isBookmarklet ? -1 : y.url.indexOf(R), D = (y.type === "bookmark" ? y.path : y.title) || "", G = D.toLowerCase().indexOf(R);
      if (y.isSearchText = !1, y.searchText && (G = y.searchText.toLowerCase().indexOf(R), y.isSearchText = !0), b !== -1 || G !== -1)
        A.push({
          item: y,
          title: D,
          urlIndex: b === -1 ? 1 / 0 : b,
          titleIndex: G === -1 ? 1 / 0 : G
        });
      else {
        var le = y.isBookmarklet ? !1 : L.test(y.url), je = L.test(D);
        y.isSearchText = !1, y.searchText && (y.isSearchText = !0, je = je || L.test(y.searchText)), (le || je) && Y.push({ title: D, item: y, urlTest: le, titleTest: je });
      }
    }), [
      A.sort((y, b) => y.urlIndex === b.urlIndex ? y.titleIndex === b.titleIndex ? y.title.length - b.title.length : y.titleIndex - b.titleIndex : y.urlIndex - b.urlIndex).map((y) => y.item),
      Y.sort((y, b) => {
        var D = Number(y.titleTest) + Number(y.urlTest), G = Number(b.titleTest) + Number(b.urlTest);
        return D === G ? y.title.length - b.title.length : G - D;
      }).map((y) => y.item)
    ];
  }
  async function x(h) {
    var E = [];
    if (/^</.test(h))
      T(v, "readingList"), E = await Ft.getAll(), h = h.slice(1);
    else if (/^\>/.test(h))
      T(v, "bookmarklet"), E = await Pt.getAll(), E = E.filter((R) => R.isBookmarklet), h = h.slice(1);
    else if (/^\s/.test(h))
      T(v, "bookmark"), E = await Pt.getAll(), E = E.filter((R) => !R.isBookmarklet), h = h.slice(1);
    else {
      T(v, "normal");
      let [R, L] = await Promise.all([ye.getAllByAllWindow(), Pt.getAll()]);
      E = R.map((A) => ({
        id: A.id ?? 0,
        title: A.title || "",
        url: A.url || "",
        favIconUrl: A.favIconUrl,
        tab: A
      })), L = L.filter((A) => !A.isBookmarklet), L.forEach((A) => {
        var Y = E.find((y) => y.url === A.url);
        Y && (Y.searchText = A.path);
      });
    }
    if (h) {
      const R = [];
      h.split(/\s+/).reduce(
        (L, A) => {
          const Y = [];
          return L.forEach((y) => {
            k(y, A).forEach((b) => {
              b.length > 0 && Y.push(b);
            });
          }), Y;
        },
        [E]
      ).forEach((L) => L.forEach((A) => R.push(A))), E = R;
    }
    return E;
  }
  async function S() {
    var h = _(a), E = await x(h), R = {}, L = [], A = /^.*\:\/\/([^\/]*)\//i, Y = (b) => {
      var D = null;
      if (_(v) === "readingList" && b.hasBeenRead)
        D = "既読";
      else if (b.isBookmarklet)
        D = "ブックマークレット";
      else {
        var G = b.url.match(A);
        G && (D = G[1].replace(/^www\./, "").replace(/\:\d+/, "")), D || (D = "その他");
      }
      var le = R[D];
      le || (le = R[D] = { favIconUrl: b.favIconUrl, name: D, tabs: [] }, L.push(le)), le.tabs.push(b);
    }, y = () => {
      var b = 0;
      L.forEach((D, G) => {
        D.__index = G, D.tabs.forEach((le) => {
          le.__index = b++;
        });
      }), d = b;
    };
    E.forEach(Y), y(), T(f, L), T(l, 0), T(o, !1), _(s) && (_(s).scrollTop = 0);
  }
  const j = Ts(S, 64);
  function O() {
    T(o, !0), j();
  }
  async function U(h) {
    if (h.isBookmarklet) {
      const A = (await ye.getCurrent()).id;
      if (typeof A != "number") {
        console.error("Current tab ID is not a number:", A);
        return;
      }
      if (!h.script || !h.script.startsWith("javascript:")) {
        console.error("Invalid bookmarklet script:", h.script);
        return;
      }
      if (!chrome.userScripts) {
        alert("拡張機能の設定画面から「ユーザー スクリプトを許可する」を有効にしてください。");
        return;
      }
      await chrome.userScripts.execute({
        js: [
          {
            code: decodeURIComponent(h.script.slice(11))
          }
        ],
        world: "MAIN",
        target: { tabId: A },
        injectImmediately: !0
      }).catch((Y) => {
        console.error(Y.message);
      }), close();
    } else if (h.type === "bookmark" || h.type === "readingList") {
      var E = await ye.getAllByAllWindow(), R = h.url.replace(/\/$/g, ""), L = E.find((A) => (A.url || "").replace(/\/$/g, "") === R);
      L ? (ye.activate(L), Et.close()) : open(h.url);
    } else
      h.tab && ye.activate(h.tab), Et.close();
  }
  function q(h) {
    T(l, h.tabs[0]?.__index || 0, !0);
  }
  function W(h, E) {
    Ft.toggleRead(h, E), T(f, _(f).map((R) => ({
      ...R,
      tabs: R.tabs.map((L) => L.url === h ? { ...L, hasBeenRead: E } : L)
    })));
  }
  function or() {
    if (c && w) {
      for (const h of _(f))
        for (const E of h.tabs)
          if (E.url === w.url) return E;
      return w;
    }
    if (r) return r;
    for (const h of _(f))
      for (const E of h.tabs)
        if (E.__index === _(l)) return E;
    return null;
  }
  function ur(h) {
    return h ? _(v) === "readingList" ? m.has(h.url) : typeof h.tab?.id == "number" ? g.has(h.tab.id) : !1 : !1;
  }
  function Mn(h) {
    typeof h?.tab?.id == "number" && (ur(h) || (g.add(h.tab.id), chrome.tabs.remove(h.tab.id)));
  }
  function Dn(h) {
    var E = h.code, R = E === "ArrowUp", L = E === "ArrowDown", A = _(n);
    if (h.ctrlKey) {
      var Y = {
        d() {
          h.preventDefault();
          var b = or();
          if (b)
            if (_(v) === "readingList") {
              if (m.has(b.url)) return;
              m.add(b.url), Ft.remove(b.url);
            } else
              Mn(b);
        },
        x() {
          if (h.preventDefault(), _(v) === "readingList") {
            var b = or();
            b && W(b.url, !b.hasBeenRead);
          }
        }
      }[h.key];
      Y?.();
      return;
    }
    if (h.shiftKey) {
      if (R) {
        if (h.preventDefault(), c = !1, A) {
          var y = _(f)[Math.max(0, (A.__index || 0) - 1)];
          y && T(l, y.tabs[0].__index || 0, !0);
        }
      } else if (L && (h.preventDefault(), c = !1, A)) {
        var y = _(f)[Math.min(_(f).length - 1, (A.__index || 0) + 1)];
        y && T(l, y.tabs[0].__index || 0, !0);
      }
    } else R ? (h.preventDefault(), c = !1, T(l, Math.max(0, _(l) - 1), !0)) : L ? (h.preventDefault(), c = !1, T(l, Math.min(d - 1, _(l) + 1), !0)) : document.activeElement !== _(i) && _(i)?.focus();
  }
  function Pn() {
    c = !0;
  }
  function Fn(h) {
    w = h;
  }
  var Ze = Ps(), gt = B(Ze);
  Tt(gt, (h) => T(i, h), () => _(i));
  var Un = ve(gt, 2), cr = B(Un), Bn = ve(B(cr), 2);
  Ot(Bn, 21, () => _(f), (h) => h.name, (h, E) => {
    {
      let R = /* @__PURE__ */ Le(() => _(n) === _(E));
      Rs(h, {
        get name() {
          return _(E).name;
        },
        get favIconUrl() {
          return _(E).favIconUrl;
        },
        get selected() {
          return _(R);
        },
        onclick: () => q(_(E))
      });
    }
  });
  var jn = ve(cr, 2), dr = B(jn), Vn = B(dr), vr = ve(dr, 2);
  Ot(vr, 21, () => _(f), (h) => h.name, (h, E) => {
    var R = Ds(), L = B(R), A = B(L), Y = ve(L, 2);
    Ot(Y, 17, () => _(E).tabs, (y) => y.id, (y, b) => {
      {
        let D = /* @__PURE__ */ Le(() => ur(_(b)) ? "opacity-50 pointer-none" : ""), G = /* @__PURE__ */ Le(() => _(b).isSearchText ? _(b).searchText : _(b).title), le = /* @__PURE__ */ Le(() => _(b).__index === _(l)), je = /* @__PURE__ */ Le(() => _(v) === "readingList"), Kn = /* @__PURE__ */ Le(() => _(v) === "readingList" ? () => W(_(b).url, !_(b).hasBeenRead) : void 0);
        Ms(y, {
          get class() {
            return _(D);
          },
          get favIconUrl() {
            return _(b).favIconUrl;
          },
          get title() {
            return _(G);
          },
          get url() {
            return _(b).url;
          },
          onclick: () => U(_(b)),
          get selected() {
            return _(le);
          },
          onmouseenter: () => Fn(_(b)),
          get hasBeenRead() {
            return _(b).hasBeenRead;
          },
          get isReadingList() {
            return _(je);
          },
          get onToggleRead() {
            return _(Kn);
          }
        });
      }
    }), at(() => ot(A, _(E).name)), ke(h, R);
  }), Tt(vr, (h) => T(s, h), () => _(s)), at(() => ot(Vn, `↓↑ ${_(p) ?? ""}`)), yn("submit", Ze, F), ze("keydown", Ze, Dn), ze("mousemove", Ze, Pn), ze("input", gt, O), Es(gt, () => _(a), (h) => T(a, h)), ke(e, Ze), _t();
}
Lt(["keydown", "mousemove", "input"]);
var Us = /* @__PURE__ */ Xe('<main class="svelte-18mg5l2"><div class="f flex-column s-full"><div class="f flex-column h0 flex-auto w-full"><!></div> <button type="button" class="button primary flex-fixed">タブソート</button></div></main>');
function Ks(e, t) {
  ht(t, !0);
  async function r() {
    await ye.sort(), Et.close();
  }
  var n = Us();
  yn("keydown", Ht, (l) => {
    (l.metaKey || l.ctrlKey) && l.key === "p" && (l.preventDefault(), close());
  });
  var i = B(n), s = B(i), a = B(s);
  Fs(a, {});
  var f = ve(s, 2);
  ze("click", f, r), ke(e, n), _t();
}
Lt(["click"]);
export {
  Ks as Main,
  js as mount,
  Vs as tabHistory,
  ye as tabUtil
};
